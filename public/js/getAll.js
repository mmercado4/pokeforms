const urlApi = "http://localhost:1212/api/pokemons";
const list = document.querySelector(".poke-list");

const getAllPokemons = () => {
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      let pokeList = data.pokemons
        .map(
          (pokemon) =>
            `<li class="text-center list-group-item">${pokemon.name}</li>`
        )
        .join("");
      list.innerHTML = pokeList;
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("fetch done"));
};

getAllPokemons();
