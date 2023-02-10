import { db } from "../database/database.connection.js"

export async function getGames(req, res){
     
    try {

        const games = await db.query("SELECT * FROM games")

        res.send(games.rows);

    } catch (error) {
        console.log(error)
    }
}

export async function insertGame(req, res){
    try {
        console.log(req.body.name)
        const {name, image, stockTotal, pricePerDay} = req.body;
        
        const nameExist = await db.query(`SELECT * FROM games WHERE name='${name}'`)
        if(nameExist.rows[0]) res.status(409).send()
        
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay})`)

        res.status(201).send()
    } catch (error) {
        console.log(error)
    }
}