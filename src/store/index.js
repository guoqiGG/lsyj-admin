import {
  createStore
} from 'vuex'
import user from './modules/users'
import getters from './getters'
export default createStore({

  modules: {
    user
  },
  getters
})