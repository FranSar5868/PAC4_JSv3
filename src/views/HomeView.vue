<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div class="image-wrapper">
    <router-link to="/pokedex">
      <div class="image-container">
      <img src="../assets/pokeball.png" alt="Pokedex">
      <span class="image-text">Go to the Pokedex...</span>
    </div>
    </router-link>

    <router-link to="/battle">
      <div class="image-container">
      <img src="../assets/pokeball.png" alt="Pokemon Battle">
      <span class="image-text">Go to the Battle of Pokemons...</span>
    </div>
    </router-link>
  </div>
  </main>
</template>

<style scoped>
   .image-wrapper {
    display: flex;
    justify-content: center;
   }

.image-container {
  text-align: center;
  padding: 1rem;
  background-color: var (--bg-color);
  color: var (--text-color);
  margin: 0 0.5rem;
}
.image-text {
  margin-top: 0.5rem;
  text-transform: uppercase;
}
.image{
  width: 100px;
}
</style>