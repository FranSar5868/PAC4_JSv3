import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/battle',
      name: 'battle',
      component: () => import('../views/BattleView.vue')
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: () => import('../views/PokedexView.vue')
    },
    {
      path: '/pokemon/:pokemonId',
      name: 'pokemon',
      props: true,
      component: () => import('../views/PokemonView.vue')
    },
  ]
})

export default router
