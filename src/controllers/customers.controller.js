import { db } from "../database/database.connection.js"

export async function getCustomers(req, res) {
    try {

        const customers = await db.query('SELECT * FROM customers')

        res.send(customers.rows)
    } catch (error) {
        console.log(error)
    }
}

export async function getCustomerById(req, res) {
    try {
        const { id } = req.params

        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`, [id])
        if (!customer.rows[0]) res.status(404).send()

        res.send(customer.rows[0])

    } catch (error) {
        console.log(error)
    }
}

export async function insertCustomer(req, res) {
    try {
        const { name, phone, cpf, birthday } = req.body

        const customerExists = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if (customerExists.rows[0]) return res.status(409).send()

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday.toString()}')`)
        
        res.status(201).send()

    } catch (error) {
        console.log(error)
    }
}

export async function updateCustomer(req, res) {
    try {
        const { id } = req.params
        const { name, cpf, phone, birthday } = req.body

        const customer = await db.query(`SELECT * FROM customers WHERE id=$1`, [id])

        if (!customer.rows) res.status(404).send('customer not found')

        if (customer.rows[0].cpf != cpf) {
            const customerByCpf = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
            
            if ( customerByCpf.rows[0] ) return res.status(409).send()
        }

        await db.query(`UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id=$1`, [id])
        res.status(200).send()
    
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}