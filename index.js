const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/private', function (req, res) {
    res.send('Hello World Private !')
})

app.get('/public', function (req, res) {
    res.send('Hello World Public')
})

app.post('/login', (req, res) => {
    res.json({
        jwt: '' // TODO
    })
})

app.listen(PORT, function () {
    console.log('Example app listening on port ' + PORT)
})