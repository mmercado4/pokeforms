const URI_HEROKU = "https://mms-pokeapi.herokuapp.com";

const getPage = (page = 1) => {
  const urlApi = `${URI_HEROKU}/api/pokemons/page/${page}`;
  const list = document.querySelector(".poke-list");
  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let pokeList = data.pokemons
        .map((pokemon) => {
          let name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
          return `<li class="text-center list-group-item">${name}</li>`;
        })
        .join("");

      list.innerHTML = pokeList;
      let numPages = data.pages;
      console.log(numPages);
      let pagination = document.querySelector("ul.pagination");
      console.log(numPages);
      pagination.innerHTML = "";
      for (let i = 1; i <= numPages; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = `https://mms-pokeform.herokuapp.com/page/${i}`; //Si no ponemos el href, no se va a ningún lado.
        a.textContent = i;
        li.className = "page-item";
        if (parseInt(page) === i) li.classList.add("active"); //Ojooo hay que hacer parse INT.
        a.className = "page-link";
        a.id = i;
        li.addEventListener("click", (event) => {
          event.preventDefault();
          console.log(event.target.id);
          getPage(event.target.id);
        });
        li.appendChild(a);
        //<li class="page-item"><a class="page-link" href="#">1</a></li>;
        pagination.appendChild(li);
      }
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("fetch done"));
};

getPage();
