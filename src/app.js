import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config()

const app = express()

app.use(cors)
app.use(express.json())

const port = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`server is listening at port ${port}`)
})