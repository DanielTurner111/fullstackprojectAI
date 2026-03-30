const conn = require('../connection.cjs')

module.exports = {
    index(request, response) {
        const sql = `SELECT * FROM categories`
        conn.query(sql, (error, results) => {
            if (error) return response.sendStatus(500)
            return response.send( { categories: results })
        })       
    },
    store(request, response) {
        const sql = `INSERT INTO categories (categoryName) VALUES (?)`
        const values = [request.body.item.categoryName]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            
            const sql = `SELECT * FROM categories`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { categories: results })
            })
        })
    },
    update(request, response){
        const sql = `UPDATE categories SET categoryName=? WHERE category_id=?`
        const values = [request.body.item.categoryName,  request.body.item.category_id]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

           
            const sql = `SELECT * FROM categories`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { categories: results })
            })
        })
    },
    destroy(request, response){
        const sql = `DELETE FROM categories WHERE category_id=?`
        const values = [request.params.category]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            const sql = `SELECT * FROM categories`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { categories: results })
            })
        })
    }
}