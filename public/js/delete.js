const urlApi = "http://localhost:1212/api/pokemons";
const list = document.querySelector(".poke-list");

const getAllPokemons = () => {
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      let pokeList = data.pokemons
        .map((pokemon) => {
          let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
          return `<li class="d-flex justify-content-between align-items-center list-group-item">
          <p>${name}</p>
          <button id="${pokemon.id}" type="button" class="btn btn-danger fill">Delete</button>
          </li>`;
        })
        .join("");
      //onclick="deletePokemon(${pokemon.id})"
      //Se puede hacer haciendo create elemente y cuando creas el button, hacerle un addeventelistener
      list.innerHTML = pokeList;
    })
    .then(() => {
      let list = document.querySelectorAll("button");
      list.forEach((node) => {
        node.addEventListener("click", (event) => {
          deletePokemon(event.currentTarget.id); //Aquí es donde está el ID dentro el objeto EVENT.
        });
      });
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("fetch done"));
};

const deletePokemon = (id) => {
  let url = "http://localhost:1212/api/pokemons";
  let obj = { id: id };
  const opts = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  fetch(url, opts)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success === true) {
        getAllPokemons();
        //Faltaría llamar a un MODAL (aviso tipo sweetalert) mostrando que se ha ejecutado la accion.
      }
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("Delete fetch done"));
};

getAllPokemons();
