const express = require("express")
const routes = require('./routes/admin')

function createServer(){
    const app = express()
    app.use(express.json())
    app.use("/admin", routes)
    return app
}

module.exports = createServer