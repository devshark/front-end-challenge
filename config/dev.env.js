'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PIZZA_API_HOSTNAME: '"http://127.0.0.1:3001/"'
})
