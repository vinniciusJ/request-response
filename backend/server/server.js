const express = require('express')
const data = require('./data.json')

const app = express()
const port = 3333

app.get('/list', (req, res) =>{
    const users = data.users
    
    return res.json(users)
})

app.listen(port, () => console.log(`API running at port ${port}`))