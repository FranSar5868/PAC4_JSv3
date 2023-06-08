<script setup>

// import {ref} from 'vue'

const props = defineProps(['info'])

</script>

<template>
  <article class="card">
    <!-- I'm a Pokemon! -->
    <h2 class="name">{{ props.info.name }}</h2>
    <img :src="props.info.sprites.front_default" alt="props.info.name">
    <h3 class="data">Atac: {{ props.info.stats[1].base_stat }}</h3>
    <h3 class="data">Defensa: {{ props.info.stats[2].base_stat }}</h3>
    <button @click="$router.push({ name: 'pokemon', params: {pokemonId: props.info.id } })">Detalls</button>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 2px solid #333;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 5px 5px #eee;
  width: fit-content;
  min-width: 200px;
  max-width: 250px;
}
.name {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

.data {
  text-align: center;
}
.card button {
  margin-top: auto;
}
</style>