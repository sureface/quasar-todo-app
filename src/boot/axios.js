import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: 'http://94.158.54.194:9092' })
Vue.prototype.$api = api

export { axios, api }
