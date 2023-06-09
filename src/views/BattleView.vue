<script setup>

import {ref, onMounted} from 'vue'

import BattleCard from '../components/BattleCard.vue'

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
      // } else if (totalCount.value === 3) {
      //   router.push({ name: 'batle' })
      }

}




</script>

<template>
  <div class="new">
    <h1>V-for component example</h1>
    <p>Total counter: {{ totalCount }}</p>
    <p v-if="turtleName !== '' ">{{ turtleName }} uses {{ turtleWeapon }}</p>
    <p v-if="defenderName !== '' && attackerAttack > defenderDefense"> {{ attackerName }} wins {{ defenderName }} because {{ attackerAttack }} attack is bigger than {{ defenderDefense }} defense</p>
    <p v-if="defenderName !== '' && attackerAttack < defenderDefense"> {{ defenderName  }} wins {{ attackerName }} because {{ attackerAttack }} attack is smaller than  {{ defenderDefense }} defense </p>

    <section class="cards">
      <!-- <BattleCard v-for="turtle in tmnt" :key="turtle.id" :info="turtle" @response="updateCounter" /> -->
      <BattleCard v-for="card in cards" :key="card.id" :info="card" @response="updateCounter"/>
    </section>
  </div>
</template>

<style>
.new {
  display: grid;
}
li {
  cursor: pointer;
}
li:hover {
  color: hsla(160, 100%, 37%, 1);
}
.cards {
  display: flex;
  gap: 2rem;
}
</style>
