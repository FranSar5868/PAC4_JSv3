<script setup>
import { ref, onMounted } from 'vue'
import pokemonService from '../services/pokemonService.js'

const cards = ref([])

onMounted(async () => {
  cards.value = await pokemonService.getRandomPokemons(10)
})
</script>

<template>
  <div class="new">
    <h1>Pokedex</h1>

    <section class="cards">
      <div v-for="card in cards" :key="card.id">
        <!-- Display the Pokémon card information -->
        <pre>{{ card }}</pre>
      </div>
    </section>
  </div>
</template>

<style>
.new {
  display: grid;
}
</style>
