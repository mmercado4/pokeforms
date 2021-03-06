const searchButton = document.querySelector("#search-pokemon");
const name = document.querySelector("#search-name");
const updateButton = document.querySelector("#update-button");

const URI_HEROKU = "https://mms-pokeapi.herokuapp.com";
const urlApi = URI_HEROKU + "/api/pokemons";

const searchPokemon = (name) => {
  if (!name) {
    alert("Write anything!");
  } else {
    const url = `${urlApi}/${name}`;
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, opts)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Pokemon not found!") {
          alert(`Pokémon not found!`);
          document.querySelector("#search-name").value = "";
        } else {
          const updateForm = document.querySelector(".update-form");
          updateForm.classList.remove("none");
          let name = document.querySelector("#name");
          let type = document.querySelector("#type");
          name.value = data.pokemon[0].name;
          type.value = data.pokemon[0].type;

          updateButton.addEventListener("click", () => {
            putPokemon(data.pokemon[0]);
          });
        }
      })
      .catch((error) => console.error(error));
  }
};

const putPokemon = (pokemon) => {
  let sure = window.confirm(
    `You are gonna update ${pokemon.name}. Are you sure?`
  );
  if (sure) {
    const url = `${urlApi}/${pokemon.id}`;
    let newName = document.querySelector("#name").value;
    let newType = document.querySelector("#type").value;
    let newParams = {
      name: newName,
      type: newType,
    };
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParams),
    };
    fetch(url, opts)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Pokemon modified!") {
          alert(`${newName} modified!`);
          document.querySelector("#name").value = "";
          document.querySelector("#type").value = "";
          document.querySelector("#search-id").value = "";
          let form = document.querySelector(".update-form");
          form.classList.add("none");
        }
      })
      .catch((error) => console.error(error));
  } else {
    document.querySelector("#name").value = "";
    document.querySelector("#type").value = "";
    document.querySelector("#search-id").value = "";
    let form = document.querySelector(".update-form");
    form.classList.add("none");
  }
};

searchButton.addEventListener("click", () => {
  searchPokemon(document.querySelector("#search-name").value);
});
