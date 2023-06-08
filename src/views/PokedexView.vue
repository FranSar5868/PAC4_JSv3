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
    <h1>Pokedex</h1>
    <input v-model="search" type="text" placeholder="type to search...">
    <br>
    <section class="cards">
        <Card v-for="card in filteredCards" :key="card.id" :info="card"/>
    </section>
    <button class="fetch-button" @click="fetchNewPokemons">Vols carregar Pokemons nous?</button>
  </div>
</template>

<style>
/* .new {
  display: grid;
} */
.cards {
  display: flex;
  gap: 2rem;
  /* max-width: 50vw; */
  flex-wrap: wrap;
}
.fetch-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ffcb05;
  color: #333;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.fetch-button:hover {
  background-color: #ffc200;
}
</style>
