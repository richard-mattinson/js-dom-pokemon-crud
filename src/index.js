const pokeUrl = "http://localhost:3000/pokemons";

const nameInput = document.getElementById("nameInput");
const imageUrlInput = document.getElementById("imageUrlInput");
const submitButton = document.getElementById("submitButton");
const pokeList = document.getElementById("pokeList");

const renderSingleCard = () => {
  fetch(pokeUrl)
    .then((resp) => resp.json())
    .then((data) => renderAllCards(data));
};

const renderAllCards = (data) => {
  data.map((pokeData) => {
    const pokeItem = document.createElement("li");
    const pokeName = document.createElement("h2");
    const pokeImage = document.createElement("img");
    const deleteButton = document.createElement("button");
    const likeButton = document.createElement("button");

    pokeItem.classList = "pokemon";
    pokeImage.setAttribute("src", pokeData.image);
    pokeName.innerText = pokeData.name;
    deleteButton.innerHTML = "Delete";
    likeButton.innerHTML = "Like";

    if (pokeData.like === true) {
      likeButton.style.backgroundColor = "red";
      likeButton.style.color = "white";
    } else {
      likeButton.style.backgroundColor = "white";
      likeButton.style.color = "black";
    }

    pokeItem.appendChild(pokeImage);
    pokeItem.appendChild(pokeName);
    pokeItem.appendChild(deleteButton);
    pokeItem.appendChild(likeButton);
    pokeList.appendChild(pokeItem);

    deleteButton.addEventListener("click", () => deletePokemon(pokeData.id));
    likeButton.addEventListener("click", () =>
      likePokemon(pokeData.id, pokeData.like)
    );
  });
};

renderSingleCard();

const addNewPokemon = (newName, newImageUrl) => {
  fetch(pokeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      image: newImageUrl
    }),
  });
  renderSingleCard();
};

submitButton.addEventListener("click", () =>
  addNewPokemon(nameInput.value, imageUrlInput.value)
);

const deletePokemon = (id) => {
  fetch(`${pokeUrl}/${id}`, {
    method: "DELETE",
  });
};

const likePokemon = (id, like) => {
  if (like === true) {
    fetch(`${pokeUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: false
      }),
    });
  } else {
    fetch(`${pokeUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: true
      }),
    });
  }
};
