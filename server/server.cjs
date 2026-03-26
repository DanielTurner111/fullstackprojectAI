const express = require('express')
const server = express()
const cors = require('cors') //npm install cors
const routes = require('./routes.cjs')
const port = 3001

server.use(cors())
server.use(express.urlencoded({ extended: false }))
server.use(express.json())

server.get("/", (request, response) => { response.send('Hello!') } )
server.use("/", routes)

server.listen(port, () => { console.log(`server running on port ${port}`) })

//required server modules
//npm install cors
//npm install express
//npm install mysql2
//npm install nodemon