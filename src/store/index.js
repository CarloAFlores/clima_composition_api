import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    llave_api:`72b433bf737a1adb736fa23e2024ab9e`,
    url_base:"https://api.openweathermap.org/data/2.5/",
    lugar:``,
    clima:{},
    fecha:null
  },
  getters: {
  },
  mutations: {
    setnombre_Lugar(state,payload){
      state.lugar = payload
    },
    setPeticion(state,payload){
      state.clima = payload
    },
    setFecha(state,payload){
      state.fecha = payload
    }
  },
  actions: {
    nombre_Lugar({commit},nombre){
      commit('setnombre_Lugar',nombre)
    },
    async peticion({commit,state}){
        let {data} = await axios.get(`${state.url_base}weather?q=${state.lugar}&units=metric&APPID=${state.llave_api}`)
        console.log(data)
        commit('setPeticion',data)
    },
    fecha({commit}){
      let d = new Date()
      let meses =["Enero","Febrero","Marzo","Abril",
      "Mayo","Junio","Julio","Agosto","Septiembre","Octubre",
      "Noviembre","Diciembre",];
      let dias=["Lunes","Martes","Miercoles",
      "Jueves","Viernes","Sabado","Domingo",]

      let dia = dias[d.getDay()]
      let dato = d.getDate();
      let mes = meses[d.getMonth()]
      let ano = d.getFullYear()

      let total = `${dia}-${dato}-${mes}-${ano}`
      commit('setFecha',total)
    }
  },
  modules: {
  }
})
