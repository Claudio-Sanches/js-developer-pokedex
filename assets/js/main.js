const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonListBig = document.getElementById('pokemonListBig')
const loadBig = document.getElementById('loadBig')
const backBig = document.getElementById('backBig')


const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                        <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    
                </div>
            
        </li>
    `
}

function convertPokemonToLiBig(pokemon) {
    return `
        <li class="pokemonBig ${pokemon.type}">
            <span class="numberBig">#${pokemon.number}</span>
            <span class="nameBig">${pokemon.name}</span>
            <div class="detailBig">
                <ol class="typesBig">
                    ${pokemon.types.map((type) => `<li class="typeBig ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo2}"
                     alt="${pokemon.name}">
  
                
            </div>
        </li>
    `
}

function loadPokemonBig(offset, limit = 1) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtmlBig = pokemons.map(convertPokemonToLiBig).join('')
        pokemonListBig.innerHTML = newHtmlBig
    })
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
    })

    // Função for subtituida pelo map e simplificado com arrow functions com o join no final
    //const listItens = {}
    //
    //for (let i = 0; i < pokemons.length; i++) {
    //    const pokemon = pokemons[i];
    //    listItens.push(convertPokemonToLi(pokemon))
    //}
}

loadPokemonItens(offset, limit)

loadPokemonBig(offset)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    newLoadBig = offset
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonBig(offset)
        loadPokemonItens(offset, limit)
    }
})

let newLoadBig = offset

loadBig.addEventListener('click', () => {
    newLoadBig = newLoadBig + 1
    if (newLoadBig < maxRecords) {
        loadPokemonBig(newLoadBig)
    }
})

backBig.addEventListener('click', () => {
    newLoadBig = newLoadBig - 1
    if (newLoadBig > -1) {
        loadPokemonBig(newLoadBig)
    }
})

/*
var botoes = document.querySelectorAll('button[type="button"]');
for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', function () {
        // e aqui, o this é o botão clicado
        var id = this.id
        console.log(id)
        if (id != 'loadMoreButton'){
            const newHtmlBig = pokemons.map(convertPokemonToLiBig).join('')
            pokemonListBig.innerHTML = newHtmlBig
        }
})}
*/

