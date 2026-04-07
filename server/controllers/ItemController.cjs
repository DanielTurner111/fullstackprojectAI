const conn = require('../connection.cjs')

module.exports = {
    index(request, response) {
        const sql = `SELECT * FROM items`
        conn.query(sql, (error, results) => {
            if (error) return response.sendStatus(500)
            return response.send( { items: results })
        })       
    }, store(request, response) {
        const sql = `INSERT INTO items (category_id, title, description, price, quantity, sku) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [request.body.item.category_id, request.body.item.title, request.body.item.description, request.body.item.price, request.body.item.quantity, request.body.item.sku]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            
            const sql = `SELECT * FROM items`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { items: results })
            })
        })
    },
    update(request, response){
        const sql = `UPDATE items SET category_id=?, title=?   WHERE id=?`
        const values = [request.body.item.category_id, request.body.item.title, request.body.item.id]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

           
            const sql = `SELECT * FROM items`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { items: results })
            })
        })
    },
    destroy(request, response){
        const sql = `DELETE FROM items WHERE id=?`
        const values = [request.params.item]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            const sql = `SELECT * FROM items`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { items: results })
            })
        })
    }

}