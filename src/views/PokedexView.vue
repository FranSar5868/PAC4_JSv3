<script setup>
import { ref, onMounted, computed } from 'vue'

import Card from '../components/Card.vue'
import pokemonService from '../services/pokemonService.js'

const cards = ref([])
const search = ref("")

onMounted(async () => {
  cards.value = await pokemonService.getRandomPokemons(10)
})

const filteredCards = computed(() => {
  return cards.value.filter((card) => {
    return card.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

</script>

<template>
  <div class="new">
    <h1>Pokedex</h1>
    <input v-model="search" type="text" placeholder="type to search...">
    <br>
    <section class="cards">
        <Card v-for="card in filteredCards" :key="card.id" :info="card"/>
    </section>
  </div>
</template>

<style>
.new {
  display: grid;
}
.cards {
  display: flex;
  gap: 2rem;
  max-width: 50vw;
  flex-wrap: wrap;
}
</style>
