const URI_HEROKU = "https://mms-pokeapi.herokuapp.com";
const urlApi = URI_HEROKU + "/api/pokemons";

const addPokemon = () => {
  const name = document.querySelector("#name").value;
  const type = document.querySelector("#type").value;
  const newPokemon = {
    name: name,
    type: type,
  };
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPokemon), //Ojo hay que parsearlo
  };
  if (name || type) {
    fetch(urlApi, opts)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector("#name").value = "";
        document.querySelector("#type").value = "";
        //Podemos meter un aviso con otra función.
      })
      .catch((error) => console.error(error));
  } else {
    alert("hay campos vacíos");
  }
};
