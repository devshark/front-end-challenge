<template>
  <section v-if="pizza">
    <button @click="backToList">Back</button>
    <h3>{{pizza.name}}</h3>
    <p>Price: {{pizza.price}}</p>
    <p>Ingredients: {{ingredients}}</p>
  </section>
</template>

<script>
import PizzaServices from '@/services/pizza'
import EventEmitter from 'events'

const $emitter = new EventEmitter()

export default {
  data: function () {
    return {
      pizza: {}
    }
  },
  computed: {
    ingredients: function () {
      if (this.pizza && this.pizza.ingredients !== undefined) {
        console.log(this.pizza)
        $emitter.emit('finished', 'computing')
        return this.pizza.ingredients.join(',')
      }
      return ''
    }
  },
  methods: {
    backToList: function () {
      this.$router.push({name: 'PizzaList'})
      $emitter.emit('finished', 'backToList')
    }
  },
  mounted: function () {
    $emitter.on('finished', what => {
      console.log('finished', what)
    })
    const pizzaName = this.$route.params.name
    PizzaServices.getPizza(pizzaName)
      .then(pizza => {
        this.pizza = pizza
        $emitter.emit('finished', 'loading')
      })
      .catch(err => {
        console.error(err)
        $emitter.emit('finished', 'error-ing')
      })
  }
}
</script>

<style scoped>

</style>
