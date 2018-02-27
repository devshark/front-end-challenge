<script>
import axios from 'axios'

const xhr = axios.create({
  baseURL: process.env.PIZZA_API_HOSTNAME
})

export default {
  getPizzas: async function () {
    return xhr.get('/pizzas')
      .then(response => response.data)
      .then(data => data.map(d => ({ name: d.name, price: d.price, ingredients: d.ingredients })))
      .catch(error => { throw new Error('Pizza not found', error) })
  },
  getPizza: async function (name) {
    return xhr.get('/pizza', {
      params: {
        name: name
      }
    })
      .then(resp => resp.data)
      .then(data => ({ name: data.name, price: data.price, ingredients: data.ingredients }))
      .catch(error => { throw new Error('Pizza not found', error) })
  }
}
</script>
