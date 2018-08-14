import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
import localStorageDao from './midwares/localStorageDao'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    base
  },
  plugins: [localStorageDao]
})
