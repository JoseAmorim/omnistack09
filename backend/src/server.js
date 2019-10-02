const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

mongoose.connect(
    'mongodb+srv://Joshep:joshepv@cluster0-7zbwn.mongodb.net/semana09?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('Rodando na porta 3333')
})
