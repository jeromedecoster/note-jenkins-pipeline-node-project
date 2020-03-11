const bodyparser = require('body-parser')
const express = require('express')

const app = express()


app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.send('ok')
})

app.post('/add', (req, res) => {

    let { a, b } = req.body

    if (a === undefined || b === undefined) {
        return res.json({
            error: 'operand is missing'
        })
    }

    a = Number(a)
    b = Number(b)

    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.json({
            error: 'operand is not a number'
        })
    }

    return res.json({
        result: a + b
    })
})

module.exports = app