const conn = require('../connection.cjs')
const fs = require('fs');
const path = require('path');

module.exports = {
    index(request, response) {
        const sql = `SELECT * FROM items`
        conn.query(sql, (error, results) => {
            if (error) return response.sendStatus(500)
            return response.send( { items: results })
        })       
    }, store(request, response) {
    const image = request.file ? request.file.filename : null;

    const sql = `
        INSERT INTO items 
        (category_id, title, description, price, quantity, sku, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    console.log('request.body:', request.body);
    console.log('request.file:', request.file);

    const values = [
        request.body.category_id,
        request.body.title,
        request.body.description,
        request.body.price,
        request.body.quantity,
        request.body.sku,
        image
    ]

    conn.query(sql, values, (error, results) => {
        if (error) {
            console.log(error);
            return response.sendStatus(500)
        }

        conn.query(`SELECT * FROM items`, (error, results) => {
            if (error) return response.sendStatus(500)
            return response.send({ items: results })
        })
    })
},
    update(request, response) {
    const image = request.file ? request.file.filename : request.body.currentImage;

    const sql = `
        UPDATE items
        SET category_id=?, title=?, description=?, price=?, quantity=?, sku=?, image=?
        WHERE id=?
    `;

    const values = [
        request.body.category_id,
        request.body.title,
        request.body.description,
        request.body.price,
        request.body.quantity,
        request.body.sku,
        image,
        request.params.item
    ];

    conn.query(sql, values, (error, results) => {
        if (error) {
            console.log(error)
            return response.sendStatus(500)
        }

        conn.query(`SELECT * FROM items`, (err, results) => {
            if (err) return response.sendStatus(500)
            return response.send({ items: results })
        })
    });
    },
    destroy(request, response){
    const id = request.params.item;

    conn.query(`SELECT image FROM items WHERE id=?`, [id], (err, results) => {
        if (err) return response.sendStatus(500)

        const image = results[0]?.image

        //delete uploaded image code commented out as two items could be using the same image
        // if (image) {
        //     const filePath = path.join(__dirname, '../uploads', image);

        //     try {
        //         if (fs.existsSync(filePath)) {
        //             fs.unlinkSync(filePath);
        //             console.log('Image deleted:', image);
        //         } else {
        //             console.log('Image not found on disk:', filePath);
        //         }
        //     } catch (err) {
        //         console.log('Error deleting image:', err);
        //     }
        // }



        if (image) {
            const filePath = path.join(__dirname, '../uploads', image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }

        conn.query(`DELETE FROM items WHERE id=?`, [id], (error) => {
            if (error) return response.sendStatus(500)

            conn.query(`SELECT * FROM items`, (error, results) => {
                if (error) return response.sendStatus(500)
                return response.send({ items: results })
            })
        })
    })
}

}