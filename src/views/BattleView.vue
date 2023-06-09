<script setup>

import {ref, onMounted} from 'vue'

import BattleCard from '../components/BattleCard.vue'
import pokemonService from '../services/pokemonService.js'



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

const attackerName = ref('');
const attackerAttack = ref(0);
const defenderName = ref('');
const defenderDefense = ref(0);


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

const getResultStyle = () => {
  if (defenderName.value !== '') {
    if (attackerAttack.value > defenderDefense.value) {
      return 'result-win'
    } else if (attackerAttack.value < defenderDefense.value) {
      return 'result-lose'
    } else {
      return 'result-tie'
    }
  }
}


</script>

<template>
  <div class="new">
    <h1 class="title">Battle of Pokemons</h1>
    <h2 class="subtitle">Selecciona dues cartes per iniciar un combat</h2>
    <h3 class="subtitle">Selecciona una tercera per començar un nou combat</h3>

    <!-- <p>Total counter: {{ totalCount }}</p> -->


    <!-- <p v-if="turtleName !== '' ">{{ turtleName }} uses {{ turtleWeapon }}</p>
    <p v-if="defenderName !== '' && attackerAttack > defenderDefense"> {{ attackerName }} wins {{ defenderName }} because {{ attackerAttack }} attack is bigger than {{ defenderDefense }} defense</p>
    <p v-if="defenderName !== '' && attackerAttack < defenderDefense"> {{ defenderName  }} wins {{ attackerName }} because {{ attackerAttack }} attack is smaller than  {{ defenderDefense }} defense </p>
    <p v-if="defenderName !== '' && attackerAttack == defenderDefense"> {{ defenderName  }} tie {{ attackerName }} because {{ attackerAttack }} equals {{ defenderDefense }} defense </p>
 -->

    <div class="result-message" :class="getResultStyle()">
      <span v-if="defenderName !== ''">
        {{ attackerName }} 
        <span v-if="attackerAttack > defenderDefense">wins </span>
        <span v-if="attackerAttack < defenderDefense">loses </span>
        <span v-if="attackerAttack === defenderDefense">ties </span>
      </span>
      <span v-if="defenderName !== ''">
        {{ defenderName }} because {{ attackerAttack }} attack is 
        <span v-if="attackerAttack > defenderDefense">bigger than</span>
        <span v-if="attackerAttack < defenderDefense">smaller than</span>
        <span v-if="attackerAttack === defenderDefense">equal to</span>
        {{ defenderDefense }} defense
      </span>
    </div>




    <section class="cards">
      <BattleCard v-for="card in cards" :key="card.id" :info="card" @response="updateCounter"/>
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

.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #666;
  text-align: center;
  margin-bottom: 1rem;
}
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

.result-win {
  color: green;
  font-weight: bold;
}

.result-lose {
  color: red;
  font-weight: bold;
}

.result-tie {
  color: blue;
  font-weight: bold;
}

.result-message {
  position: fixed;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  text-align: center;
  z-index: 9999;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 0 5px 5px #eee;
  text-transform: uppercase;
  border: 2px solid red;
}
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
