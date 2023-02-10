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
        const {name, image, stockTotal, pricePerDay} = req.body;
        
        const nameExist = await d

    } catch (error) {
        console.log(error)
    }
}