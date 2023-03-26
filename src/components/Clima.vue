<template>
  <div class="clima">
    <input type="text"
    class="clima__busqueda"
    placeholder="Buscando..."
    autocomplete="nope"
    v-model="nombre"
    @keyup.enter="lugar(); pronostico()">

  <div class="informacion">
    <div class="informacion__pais">
      <p>{{clima.name}}</p>
      <p>{{clima.sys.country}}</p>
    </div>
  </div>

  <div class="temperatura">
      <p>Estamos a: <br> {{Math.round(clima.main.temp)}}°</p> 
      <p>Hoy es:<br>{{fecha}}</p>
  </div>

  <div class="tipo">
    <p class="tipo__p">Clima: <br>
      <span class="tipo__p__span">{{clima.weather[0].main}}</span>
    </p>
  </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(){
        const store = useStore()
        const nombre = ref('')
        const clima = computed(()=>{
            return store.state.clima
        })
        const fecha = computed(()=>{
          return store.state.fecha
        })
        const lugar = (()=>{
          store.dispatch('nombre_Lugar',nombre.value)
        })
        const pronostico = (()=>{
          store.dispatch('peticion')
        })
        onMounted(()=>{
          store.dispatch('fecha')
        })
        return{
            nombre,
            clima,
            fecha,
            pronostico,
            lugar
        }
    }

}
</script>

<style lang="scss" scoped>
.clima{
  background: linear-gradient(60deg, rgba(24, 68, 22, 0.5), rgba(14, 221, 25, 0.5));
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__busqueda{
    width: 100%;
    height: 5vh;
    color:  #131311;
    font-size:3.5vw;
    border: none;
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.25);
    background-color:rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
  }
  .informacion{
    margin-top: 10%;
    background: linear-gradient(100deg,rgba(202, 193, 193, 0.5), rgba(230, 194, 194, 0.5));
    box-shadow: 3px 6px 3px  gray;
    width: 60%;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 3.5vw;
    border-radius: 10px;
  }
  .temperatura{
    margin-top: 20%;
    width: 50%;
    height: 15vh;
    display: grid;
    place-items: center;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 3.5vw;
    background: linear-gradient(60deg,rgba(223, 189, 189, 0.801),rgba(151, 216, 197, 0.795));
    border-radius: 10px;
    box-shadow: 10px 10px 3px gray;
  }
  .tipo{
    margin-top: 30%;
    width: 30%;
    height: 8vh;
    display: grid;
    place-items: center;
    text-align: center;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 100;
    font-size: 6vw;
    background: linear-gradient(60deg,rgba(223, 189, 189, 0.801),rgba(151, 216, 197, 0.795));
    border-radius: 10px;
    box-shadow: 10px 10px 3px gray;
    &__p{
      &__span{
        font-weight: 900;
      }
    }
  }
}
@media(min-width: 700px){
  .clima{
    &__busqueda{
      font-size: 1.3rem;
    }
    .informacion{
      margin-top: 2%;
    }
    .temperatura{
      margin-top: 2%;
      height: 45vh;
    }
    .tipo{
      margin-top: 3%;
      height: 20vh;
      font-size: 4vw;
    }
  }

}
</style>s