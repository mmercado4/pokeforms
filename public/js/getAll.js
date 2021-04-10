const URI_HEROKU = "https://mms-pokeapi.herokuapp.com";
//https://mms-pokeapi.herokuapp.com/api/pokemons
const urlApi = URI_HEROKU + "/api/pokemons";
const list = document.querySelector(".poke-list");

const getAllPokemons = () => {
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      let pokeList = data.pokemons
        .map((pokemon) => {
          let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
          return `<li class="text-center list-group-item">${name}</li>`;
        })
        .join("");
      list.innerHTML = pokeList;
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("fetch done"));
};

getAllPokemons();
