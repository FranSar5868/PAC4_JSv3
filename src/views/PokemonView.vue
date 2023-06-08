<script setup>
import {ref, onMounted} from 'vue' 
// import myAPI from '../services/pokemonService.js'
import { defineProps } from 'vue';
import pokeAPI from '../services/pokemonService.js'
const props = defineProps(['pokemonId'])

const information = ref({});

onMounted(() => {
  pokeAPI.getSinglePokemon( props.pokemonId ).then( (response) => {
    console.log(response.data)
    information.value = response.data; 
  })
})



</script>

<template>
  <div class="new">
    <h1>Detalls del Pokemon</h1>
    <p>ID: {{ information.id }}</p>
    <h2>{{ information.title }}</h2>
    <img :src="information.url" alt="">
  </div>
</template>


<style>
.new {
  display: grid;
}
</style>
