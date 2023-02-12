import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
            SELECT json_build_object(
                'id', rentals.id,
                'customer_id', rentals."customerId",
                'game_id', rentals."gameId",
                'rent_date', rentals."rentDate",
                'days_rented', rentals."daysRented",
                'return_date', rentals."returnDate",
                'original_price', rentals."originalPrice",
                'delay_fee', rentals."delayFee",
                'customer', json_build_object(
                    'id', customers.id,
                    'name', customers.name
                ),
                'game', json_build_object(
                    'id', games.id,
                    'name', games.name
                )
            ) 
            FROM rentals
            JOIN customers
              ON rentals."customerId" = customers.id
            JOIN games
              ON rentals."gameId" = games.id
        `)

        res.send(rentals.rows.map(obj => obj.json_build_object          ))
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function insertRental(req, res) {
    try {
        const {customerId, gameId, daysRented } = req.body;

        const dateNow = dayjs().format('YYYY-MM-DD')

        // return res.send(typeof dateNow)

        const query = await db.query(`
            SELECT json_build_object(
                'customer_name', customers.name,
                'game_name', games.name,
                'game_price', games."pricePerDay",
                'game_stock', games."stockTotal"
            )
            FROM customers 
            JOIN games
              ON games.id=${gameId}
            WHERE customers.id=${customerId}
        `)

        if(!query.rows[0]) return res.status(400).send()

        const {customer_name, game_name, game_price, game_stock} = query.rows[0].json_build_object

        if(!(game_stock >= 1) || !customer_name || !game_name) return res.status(400).send()

        //customer, game
        //'{"id": ${customerId}, "name": ${customer_name}}'::json, 
        //'{"id": ${gameId}, "name": ${game_name}}'::json )
        const rental = await db.query(`
            INSERT INTO rentals
                ("customerId", "gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
            VALUES 
                (
                    ${customerId}, 
                    ${gameId}, 
                    '${dateNow}',
                    ${daysRented},
                    NULL, 
                    ${daysRented*game_price}, 
                    NULL
                )
        `)
        
        res.status(201).send(rental)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function finishRental(req, res) {
    try {

        const {id} = req.params
        const rentalQuery = await db.query(`
            SELECT rentals.*, TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate"
            FROM rentals WHERE id=${id}
        `)
        if(!rentalQuery.rows[0]) return res.status(404).send()

        const dailyFine = 1500
        const {rentDate, daysRented, originalPrice, delayFee} = rentalQuery.rows[0]

        const expectedReturn = dayjs(rentDate).add(daysRented, 'day').format('YYYY-MM-DD')
        const dateNow= dayjs().format('YYYY-MM-DD')

        const delay = dayjs(dateNow).diff(dayjs(expectedReturn), 'd')

        delayFee = 0
        if(delay >= 1){
            delayFee = delay*1500
        }
        
        await db.query(`
            UPDATE rentals
            SET "returnDate" = '${dateNow}', "delayFee"= ${delayFee}
            WHERE id=${id}
        `)
        return res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function deleteRental(req, res) {
    try {
        const {id} = req.params;

        const rentalExist = await db.query(`
            SELECT *
            FROM rentals
            WHERE id=$1
        `, [id])

        if(!rentalExist.rows[0]) return res.status(404).send()

        if(!rentalExist.rows[0].returnDate) return res.status(400).send()
    
        await db.query(`
            DELETE
            FROM rentals
            WHERE id=$1
        `,[id])

        res.send(rentalExist.rows[0].returnDate)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}