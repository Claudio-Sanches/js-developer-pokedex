
// Promises quando houver resposta será executado. Função assincrona
/* fetch(url)
    .then(function (response) {
        response
        .json()
        .then(function (responseBody) {
            console.log(responseBody)
        })
        

    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
        console.log('Requisição concluída')
    })
*/

/* === Redução da verbosidade e eliminando o encadeamento de 
fetch(url)
    .then(function (response) {
        return response.json{}
    })
    .then(function(jsonBory){
        console.log(jsonBory)
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
        console.log('Requisição concluída')
    })
*/

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.photo2 = pokeDetail.sprites.other.home.front_default
   
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// === Aplicando arrow function com a Redução da verbosidade ====== 
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

