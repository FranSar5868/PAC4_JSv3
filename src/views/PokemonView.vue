<script setup>
import {ref, onMounted} from 'vue' 
// import { defineProps } from 'vue';
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
  <div class="card-details">
    <div class="card-detail">
    <h1 class="pokemon-title">Detalls del Pokemon <span class="pokemon-name">{{ information.name }}</span></h1>

    <!-- <p>ID: {{ information.id }}</p> -->
    
    <img :src="information.sprites?.front_default" alt="information.name">

    <img v-if="information.sprites && information.sprites.back_default" :src="information.sprites.back_default" :alt="information.name" />

    <div class="card-detail-types">
        <div v-for="type in information.types" :key="type.type.name" class="card-detail-type">
          {{ type.type.name }}
        </div>
      </div>


      
      </div>
    </div>
</template>




<style>
.new {
  display: grid;
}
.pokemon-title {
  text-align: center;
}
.pokemon-name {
  text-transform: uppercase;
  font-weight: bold;
}

.card-details {
  margin: 0 auto;
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(182, 12, 12, 0.1);
  max-width: 400px;
}

.card-detail {
  display: flex;
  background-color: #da5151;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-detail-image {
  width: 200px;
  height: auto;
}

.card-detail-image-back {
  width: 200px;
  height: auto;
}

.card-detail-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}

.card-detail-stats {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.card-detail-stat {
  margin-right: 20px;
}

.card-detail-stat-label {
  font-size: 24px;
  font-weight: bold;
  color: #0c4fdf;
}

.card-detail-stat-value {
  font-size: 28px;
  font-weight: bold;
}

.card-detail-types {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.card-detail-type {
  padding: 6px 12px;
  background-color: #0d7c60;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
}

</style>
