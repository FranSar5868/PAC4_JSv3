<script setup>

import {ref} from 'vue'

const props = defineProps(['info'])

const emit = defineEmits(['response'])

const count = ref(0)


const increment = () => {
  count.value++ ;
  emit('response', props.info.name, props.info.stats[1].base_stat, props.info.stats[2].base_stat );
}
</script>

<template>
  <article class="card" :class="props.info.color">
    <!-- I'm a pokemon! -->
        <!-- <p>{{ props.info.weapon }}</p> -->

    <div v-if="count === 1">
    <h2>{{ props.info.name }}</h2>
    <img :src="props.info.sprites.front_default" alt="props.info.name">
    <h3 class="data">Atac: {{ props.info.stats[1].base_stat }}</h3>
    <h3 class="data">Defensa: {{ props.info.stats[2].base_stat }}</h3>
    </div>

    <!-- <button @click="$router.push({ name: 'single', params: {turtleId: props.info.id } })">View more...</button> -->
    <!-- <button :class="{ max : count>=10 }" @click="increment">Counter {{ count }}</button> -->
    <button :class="{ max : count === 1 }" @click="increment">Click to combat! {{ count }}</button>

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
  background-color: var(--bg-card);
  color: var(--text-card);
}
.card button {
  margin-top: auto;
}
.orange {
  box-shadow: 0 0 10px 5px orange;
}
.blue {
  box-shadow: 0 0 10px 5px blue;
}
.red {
  box-shadow: 0 0 10px 5px red;
}
.purple {
  box-shadow: 0 0 10px 5px purple;
}
.max {
  background-color: gold;
}
.attacker {
  background-color: gold;
}
.defender {
  background-color: gold;
}
</style>