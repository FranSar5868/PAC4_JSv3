<script setup>
import { ref, onMounted, computed } from 'vue'

import Card from '../components/Card.vue'
import pokemonService from '../services/pokemonService.js'

const cards = ref([])
const search = ref("")

onMounted(async () => {
  // cards.value = await pokemonService.getRandomPokemons(10)
  const cachedCards = JSON.parse(localStorage.getItem('pokemonCards')) || []

  if (cachedCards.length > 0) {
    cards.value = cachedCards
  } else {
    cards.value = await pokemonService.getRandomPokemons(10)
    localStorage.setItem('pokemonCards', JSON.stringify(cards.value))
  }
})

const filteredCards = computed(() => {
  return cards.value.filter((card) => {
    return card.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const fetchNewPokemons = async () => {
  cards.value = await pokemonService.getRandomPokemons(10)
  localStorage.setItem('pokemonCards', JSON.stringify(cards.value))
}

</script>

<template>
  <div class="new">
    <h1 class="title">Pokedex</h1>
    <input v-model="search" type="text" placeholder="Tecleja per filtrar pel nom..." class="search-input">
    <br>
    <section class="cards">
        <Card v-for="card in filteredCards" :key="card.id" :info="card"/>
    </section>
    <button class="fetch-button" @click="fetchNewPokemons">Vols carregar Pokemons nous?</button>
  </div>
</template>

<style scoped>
.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
}

.search-input {
  width: 300px; /* Adjust the width as needed */
  margin: 0 auto; /* Center the input horizontally */
  display: block; /* Display as block element to take up only necessary width */
  padding: 8px; /* Add padding for better visual appearance */
  font-size: 16px; /* Adjust font size as needed */
}

.cards {
  display: flex;
  gap: 2rem;
  /* max-width: 50vw; */
  flex-wrap: wrap;
}

.fetch-button {
  position: fixed;
  bottom: 600px;
  right: 200px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 9999;
}


.fetch-button:hover {
  background-color: #ffc200;
}
</style>
