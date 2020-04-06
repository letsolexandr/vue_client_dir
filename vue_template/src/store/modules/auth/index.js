import axios from 'axios';
import config from '@/config';


const state = {
    config:config,
    token: localStorage.getItem('token') || '',
    user: {},
    permissions:[]
}

const actions = {

  login({ commit }, form_data) {
  let prom =  new Promise((resolve, reject) => {
    delete axios.defaults.headers.common['Authorization']
    axios.post(`${config.domen}/rest-auth/login/`,form_data)
      .then(response => {
        debugger
        const data = response.data;
        const token = data.key
        state.token = token;
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        return(response)
      }).then(result=>{
      return axios.get(`${config.domen}/api-base/user-permissions`)
      .then(response=>{
        debugger;
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('permissions', response.data.permissions)
        state.permissions = response.data.permissions
        return(response)
      })
    }).then(result=>{
      debugger
      resolve(result)
    })
      .catch(err => {
        debugger
        localStorage.removeItem('token')
        reject(err)
      })
  })
  return prom
},
logout({ commit }) {
  return new Promise((resolve, reject) => {
    axios.post(`${config.domen}/rest-auth/logout/`)
      .then(response => {
        const data = response.data;
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('permissions')
        delete axios.defaults.headers.common['Authorization']
        state.token = localStorage.getItem('token') || ''
        resolve(response)
      })
      .catch(err => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        reject(err)
      })
  })
}
}

const getters= {
    isLoggedIn: state => {
      state.token = localStorage.getItem('token') || ''
      if(state.token){
        return true
      }
      else{
        return false
       }
    },
    getUser:state => {
      let user = localStorage.getItem('user')
      if (user){
      state.user = JSON.parse(user)
      return state.user
      }
      else{
        return {}
      }

    },
    getPermissions: state => {
      let permissions = localStorage.getItem('permissions')
      if(permissions){
        state.permissions = permissions.split(',')
      }
      else{
        state.permissions = []
      }
      debugger
      return state.permissions},
  }


const authModule = {
  state,
  actions,
  getters
}

export default authModule;
