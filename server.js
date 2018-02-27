const express = require('express')
const cors = require('cors')
const fs = require('fs')

const order = JSON.parse(fs.readFileSync('./server/order.json', 'utf8'))
const pizzas = JSON.parse(fs.readFileSync('./server/pizzas.json', 'utf8'))

const port = process.env.PORT || 3001;

const app = express()

app.use(cors())

app.get('/pizzas', (req, res) => {
  res.json(pizzas)
})

app.get('/pizza', (req, res) => {
  const name = req.query.name
  const pizza = pizzas.find(p => p.name.toLowerCase() === name.trim().toLowerCase())
  console.log('pizza name: %s; instance:', name, pizza)
  if (pizza === undefined) {
    res.json({})
  } else {
    res.json(pizza)
  }
})

app.post('/order', (req, res) => {
  res.json(order)
})

app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log('Listening on port number %s', port)
})
