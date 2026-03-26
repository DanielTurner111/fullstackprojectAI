const conn = require('../connection.cjs')

module.exports = {
    index(request, response) {
        const sql = `SELECT * FROM entries`
        conn.query(sql, (error, results) => {
            if (error) return response.sendStatus(500)
            return response.send( { entries: results })
        })       
    },
    store(request, response) {
        const sql = `INSERT INTO entries (value1, value2, value3) VALUES (?, ?, ?)`
        const values = [request.body.item.value1, request.body.item.value2, request.body.item.value3]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            //send back all items
            const sql = `SELECT * FROM entries`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { entries: results })
            })
        })
    },
    update(request, response){
        const sql = `UPDATE entries SET value1=?, value2=?, value3=? WHERE id=?`
        const values = [request.body.item.value1, request.body.item.value2, request.body.item.value3, request.body.item.id]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            //send back all items
            const sql = `SELECT * FROM entries`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { entries: results })
            })
        })
    },
    destroy(request, response){
        const sql = `DELETE FROM entries WHERE id=?`
        const values = [request.params.entry]
        conn.query(sql, values, (error, results) => {
            console.log(`results: ${ JSON.stringify(results) }`)
            if (error) return response.sendStatus(500)

            //send back all items
            const sql = `SELECT * FROM entries`
            conn.query(sql, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send( { entries: results })
            })
        })
    }
}