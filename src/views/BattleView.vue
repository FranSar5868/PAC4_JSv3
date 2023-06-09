<script setup>

import {ref, onMounted} from 'vue'

import BattleCard from '../components/BattleCard.vue'
import pokemonService from '../services/pokemonService.js'


const tmnt = [
  {id:1, name: 'Leonardo', weapon: 'Katana', color: 'blue'},
  {id:2, name: 'Rapahel', weapon: 'Sai', color: 'red'},
  {id:3, name: 'Donatello', weapon: 'Jo', color: 'purple'},
  {id:4, name: 'Michelangelo', weapon: 'Nunchuk', color: 'orange'}
  ]

  const cards = ref([])

  onMounted(async () => {
  const cachedCards = JSON.parse(localStorage.getItem('pokemonCards')) || []

  if (cachedCards.length > 0) {
    cards.value = cachedCards
  } else {
    cards.value = await pokemonService.getRandomPokemons(10)
    localStorage.setItem('pokemonCards', JSON.stringify(cards.value))
  }
})

const fetchNewPokemons = async () => {
  cards.value = await pokemonService.getRandomPokemons(10)
  localStorage.setItem('pokemonCards', JSON.stringify(cards.value))
}

const totalCount = ref(0);

const turtleName = ref('');
const turtleWeapon = ref('');

const attackerName = ref('');
const attackerAttack = ref(0);
const defenderName = ref('');
const defenderDefense = ref(0);

// const updateCounter = (n, w) => {
//   totalCount.value++
//   turtleName.value = n;
//   turtleWeapon.value = w;
// }

const updateCounter = (name, attack, defense) => {
  totalCount.value++

  if (totalCount.value === 1) {
        attackerName.value = name
        attackerAttack.value = attack
      } else if (totalCount.value === 2) {
        defenderName.value = name
        defenderDefense.value = defense
      } else if (totalCount.value === 3) {
        window.location.reload()
      }

}




</script>

<template>
  <div class="new">
    <h1>Battle of Pokemons</h1>
    <h2>Selecciona dues cartes per iniciar el combat</h2>
    <h3>Selecciona una tercera per començar de nou</h3>

    <p>Total counter: {{ totalCount }}</p>
    <p v-if="turtleName !== '' ">{{ turtleName }} uses {{ turtleWeapon }}</p>
    <p v-if="defenderName !== '' && attackerAttack > defenderDefense"> {{ attackerName }} wins {{ defenderName }} because {{ attackerAttack }} attack is bigger than {{ defenderDefense }} defense</p>
    <p v-if="defenderName !== '' && attackerAttack < defenderDefense"> {{ defenderName  }} wins {{ attackerName }} because {{ attackerAttack }} attack is smaller than  {{ defenderDefense }} defense </p>
    <p v-if="defenderName !== '' && attackerAttack == defenderDefense"> {{ defenderName  }} tie {{ attackerName }} because {{ attackerAttack }} equals {{ defenderDefense }} defense </p>

    <section class="cards">
      <BattleCard v-for="card in cards" :key="card.id" :info="card" @response="updateCounter"/>
    </section>
    <button class="fetch-button" @click="fetchNewPokemons">Vols carregar Pokemons nous?</button>

  </div>
</template>

<style scoped>

.cards {
  display: flex;
  gap: 2rem;
  /* max-width: 50vw; */
  flex-wrap: wrap;
}
/* .fetch-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #ffcb05;
  color: #333;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  justify-content: center;
} */

.fetch-button {
  position: fixed;
  bottom: 600px;
  right: 20px;
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
