const express = require('express')
const {response} = require("express");
const morgan = require("morgan")
const app = express()

app.use(express.static("build"))
app.use(express.json())
morgan.token("postbody", function (req, res) { return req.method==="POST"?JSON.stringify(req.body):" "})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postbody"))

let phonebook = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "aa",
        "number": "3",
        "id": 6
    },
    {
        "name": "aaa",
        "number": "3",
        "id": 7
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(p => p.id !== id)

    response.status(204).end()
})

app.get('/api/info', (req, res) => {
    // console.log(res)
    res.send(`Phonebook has info for ${phonebook.length} people
    ${new Date()}`)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (phonebook.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'person already exists'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*10000),
    }

    phonebook = phonebook.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})