// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
import Vue from 'vue'
import Vuex from 'vuex'
 

Vue.use(Vuex)
 
const actions = {}
const state = {
  user_name: localStorage.getItem('user_name'),
  isLogin : localStorage.getItem('isLogin')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  userName: (state) => state.user_name,
  isLogin :(state) => state.isLogin
}
const mutations = {
  handleUserName: (state, user_name) => {
      state.user_name = user_name
      localStorage.setItem('user_name', user_name)  
  },
  isLogin(state,status){
    state.isLogin = status;
    localStorage.setItem('isLogin', status)
  },
  LoginOut (state){
    localStorage.clear();
    state.user_name = '';
    state.isLogin = false;
  },
 
}
 
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store;