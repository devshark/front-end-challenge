<template>
  <section>
    <h4>Pick a pizza</h4>
    <ul>
      <li v-for="(pizza, id) in pizzas" :key="id"
      @click="showPizzaDetail(pizza.name)">{{pizza.name}}</li>
    </ul>
  </section>
</template>

<script>
import pizzaService from '@/services/pizza.vue'

export default {
  data: function () {
    return {
      pizzas: []
    }
  },
  methods: {
    showPizzaList: function () {
      pizzaService.getPizzas()
        .then(pizzas => {
          this.pizzas = pizzas
        })
        .catch(err => {
          console.error(err)
        })
    },
    showPizzaDetail: function (name) {
      this.$router.push({name: 'PizzaDetail', params: { name: name }})
    }
  },
  mounted: function () {
    this.showPizzaList()
  }
}

</script>

<style>
section {
  width:480px;
  margin: 0 auto;
  text-align: left;
}
ul {
  padding-left: 0;
  list-style-type: cjk-ideographic;
}
ul > li {
  cursor: pointer;
  margin-bottom: 5px;
}
ul > li:hover {
  text-decoration: underline;
}
</style>
