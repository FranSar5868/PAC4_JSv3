import axios from 'axios'

const pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getRandomPokemons(numPokemons) {
    const maxNumOfPokemons = 1010
    const pokemonIds = Array.from({ length: numPokemons }, () =>
      Math.floor(Math.random() * maxNumOfPokemons) + 1
    )
    const pokemonRequests = pokemonIds.map(id =>
      pokeAPI.get(`/pokemon/${id}`).then(response => response.data)
    )
    return Promise.all(pokemonRequests)
  },
  getSinglePokemon(pokemonId) {
    return pokeAPI.get(`/pokemon/${pokemonId}`);
  }
}
