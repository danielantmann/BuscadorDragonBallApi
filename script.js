const txtCharacter = document.getElementById("txt-character");
const containerCards = document.getElementById("containerCards");
const containerCards2 = document.getElementById("containerCards2");
const accesibilidadBotons = [
  ["monocromo", "./img/monocromo.png", "Convertir colores a blanco y negro."],
  ["lupa", "./img/lupa.png", "Hace zoom para ver de manera más óptima."],
  [
    "saturacion-high",
    "./img/saturacionHigh.png",
    "Aumenta la intensidad de los colores.",
  ],
  [
    "saturacion-low",
    "./img/saturacionLow.png",
    "Disminuye la intensidad de los colores.",
  ],
];
const BASE_URL = "https://dragonball-api.com/api/characters";
const URL_CHARACTER = "https://dragonball-api.com/api/characters?name=";

//Cargar botones principales
if (document.URL.match("./index.html$")) {
  let botonesRace = [
    "Human",
    "Saiyan",
    "Namekian",
    "Majin",
    "Frieza Race",
    "Android",
    "Jiren Race",
    "God",
    "Angel",
    "Evil",
    "Nucleico",
    "Nucleico benigno",
    "Unkwnown",
  ];
  let botonesAffiliation = [
    "Z Fighter",
    "Freelancer",
    "Army of Frieza",
    "Pride Troopers",
    "Assistant of Vermoud",
    "Assistant of Beerus",
    "Villain",
    "Other",
  ];

  let nodoDivRace = document.querySelector("nav").children[0];
  let nodoDivAffiliation = document.querySelector("nav").children[1];

  botonesRace.forEach((textoBoton) => {
    let nodoBoton = document.createElement("button");
    nodoBoton.setAttribute("class", "race-button");

    let nodoTexto = document.createTextNode(textoBoton);
    nodoBoton.append(nodoTexto);

    nodoDivRace.appendChild(nodoBoton);
  });

  botonesAffiliation.forEach((textoBoton) => {
    let nodoBoton = document.createElement("button");
    nodoBoton.setAttribute("class", "affiliation-button");

    let nodoTexto = document.createTextNode(textoBoton);
    nodoBoton.append(nodoTexto);

    nodoDivAffiliation.appendChild(nodoBoton);
  });
}
const getApi = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la red: " + response.statusText);
    }
    const data = await response.json();
    return data.items || data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

const createCard = (character) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = character.image;
  img.alt = character.name;
  img.className = "character-img";
  // Agregar evento de clic a la imagen
  img.addEventListener("click", () => {
    window.open(`extendedCard.html?id=${character.id}`, "_blank"); // Abre en una nueva pestaña
  });

  const descriptionCard = document.createElement("div");
  descriptionCard.classList.add("description-card");

  const name = document.createElement("h2");
  name.textContent = character.name;

  const gender = document.createElement("p");
  gender.textContent = "Gender: " + (character.gender || "N/A");

  const ki = document.createElement("p");
  ki.textContent = "Ki: " + (character.ki || "N/A");

  const race = document.createElement("p");
  race.textContent = "Race: " + (character.race || "N/A");

  descriptionCard.append(name, gender, ki, race);
  card.append(img, descriptionCard);
  containerCards.appendChild(card);
};

const createExtendedCard = (character, container) => {
  const card = document.createElement("div");
  card.classList.add("extended-card"); // Clase para el contenedor de la tarjeta

  const name = document.createElement("h1");
  name.textContent = character.name;
  name.classList.add("character-name"); // Clase para el nombre

  const img = document.createElement("img");
  img.src = character.image;
  img.alt = character.name;
  img.className = "character-img"; // Clase para la imagen

  const descriptionCard = document.createElement("div");
  descriptionCard.classList.add("description-card2"); // Clase para el contenedor de descripción

  const gender = document.createElement("p");
  gender.textContent = "Gender: " + (character.gender || "N/A");

  const ki = document.createElement("p");
  ki.textContent = "Ki: " + (character.ki || "N/A");

  const maxKi = document.createElement("p");
  maxKi.textContent = "Max Ki: " + (character.maxKi || "N/A");

  const race = document.createElement("p");
  race.textContent = "Race: " + (character.race || "N/A");

  const affiliation = document.createElement("p");
  affiliation.textContent = "Affiliation: " + (character.affiliation || "N/A");

  const originPlanet = document.createElement("p");
  originPlanet.textContent =
    "Planet: " + (character.originPlanet.name || "N/A");

  const description = document.createElement("p");
  description.textContent = "Description: " + (character.description || "N/A");

  // Agregar todos los elementos de descripción al contenedor de descripción
  descriptionCard.append(
    name,
    gender,
    ki,
    maxKi,
    race,
    affiliation,
    originPlanet,
    description
  );

  // Agregar el nombre, la imagen y el contenedor de descripción a la tarjeta
  card.append(img, descriptionCard);

  // Agregar la tarjeta al contenedor proporcionado
  container.appendChild(card);

  const transformationsContainer = document.getElementById("transformaciones"); // Obtener el contenedor de transformaciones
  if (character.transformations && character.transformations.length > 0) {
    console.log(character.transformations);

    // Título para transformaciones

    character.transformations.forEach((transformation) => {
      const transformationCard = document.createElement("div");
      transformationCard.classList.add("card");
      const transformationImg = document.createElement("img"); // Cambiado a img
      transformationImg.src = transformation.image; // Asignar la imagen correctamente
      transformationImg.alt = transformation.name; // Agregar alt para accesibilidad

      const descriptionCard = document.createElement("div");
      descriptionCard.classList.add("description-card");

      const transformationName = document.createElement("h2");
      transformationName.textContent = transformation.name;
      const transformationKi = document.createElement("p");
      transformationKi.textContent = "Ki: " + (transformation.ki || "N/A");

      descriptionCard.append(transformationName, transformationKi);
      transformationCard.append(transformationImg, descriptionCard);
      console.log(transformationCard);

      transformationsContainer.appendChild(transformationCard); // Agregar la tarjeta de transformación al contenedor
    });
  }
};

const createTransformationCards = (transformations) => {
  transformations.forEach((transformation) => {
    createCard(transformation);
  });
};

const createAllCharacters = async () => {
  const data = await getApi(`${BASE_URL}?limit=12`);
  data.forEach(createCard);
};

let debounceTimer;

const getCharacterByName = async (event) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    containerCards.innerHTML = "";
    const name = event.target.value.trim();
    if (name) {
      const data = await getApi(`${URL_CHARACTER}${name}`);
      if (data.length > 0) {
        data.forEach(createCard); // Crear la carta del personaje principal
        if ((dataEvo = await getApi(`${BASE_URL}/${data[0].id}`))) {
          if (dataEvo.transformations.length > 0) {
            for (let i = 0; i < dataEvo.transformations.length; i++) {
              dataEvo.transformations[i].id = dataEvo.id;
            }
            createTransformationCards(dataEvo.transformations);
          }
        }
      } else {
        const noResults = document.createElement("p");
        noResults.textContent =
          "No se encontraron personajes. Intenta con otro nombre.";
        noResults.classList.add("no-results");
        containerCards.appendChild(noResults);
      }
    } else {
      createAllCharacters();
    }
  }, 300);
};

const buttons = document.querySelectorAll(".race-button, .affiliation-button");

const busquedaRazaAfiliacion = async (type, value) => {
  containerCards.innerHTML = ""; // Limpiar el contenedor
  const data = await getApi(`${BASE_URL}?${type}=${value}`); // Hacer la consulta a la API
  if (data.length > 0) {
    data.forEach(createCard);
  } else {
    const noResults = document.createElement("p");
    noResults.textContent = `No se encontraron personajes de la ${
      type === "race" ? "raza" : "afiliación"
    } ${value}.`;
    noResults.classList.add("no-results");
    containerCards.appendChild(noResults);
  }
};

// Manejar clics en botones de raza y afiliación
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.classList.contains("race-button")
      ? "race"
      : "affiliation"; // Determinar el tipo
    const value = button.textContent; // Obtener el texto del botón

    busquedaRazaAfiliacion(type, value); // Llamar a la función genérica
  });
});

const loadCharacterData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get("id");

  if (characterId) {
    const characterData = await getApi(`${BASE_URL}/${characterId}`);
    const containerCards2 = document.getElementById("containerCards2");
    createExtendedCard(characterData, containerCards2);
  } else {
    console.error("No se proporcionó un ID de personaje.");
  }
};

// Determinar en qué página estamos
if (document.getElementById("txt-character")) {
  // Página principal
  window.addEventListener("DOMContentLoaded", createAllCharacters);
  document
    .getElementById("txt-character")
    .addEventListener("keyup", getCharacterByName);
} else if (document.getElementById("containerCards2")) {
  // Página extendedCard.html
  window.addEventListener("DOMContentLoaded", loadCharacterData);
}

acces.addEventListener("click", function () {
  let nodo = document.createDocumentFragment();
  let menu = document.createElement("div");
  menu.className = "menu-acces";
  menu.style.display = "flex";
  menu.style.flexWrap = "wrap";
  anyadirBtnAcces(menu);
  nodo.appendChild(menu);
  acces.appendChild(nodo);

  // Activar la transición después de que el menú se haya añadido al DOM
  // Retardo muy pequeño para permitir que el DOM se actualice
});

function anyadirBtnAcces(menu) {
  accesibilidadBotons.forEach((boton) => {
    let nodo = document.createElement("div");
    let nodoImg = document.createElement("div");
    let nodoText = document.createElement("div");
    nodo.id = boton[0];
    nodo.style.display = "flex";
    nodo.style.justifyContent = "center";
    nodo.style.alignItems = "center";
    nodo.style.cursor = "pointer";
    nodo.style.width = "50%";
    nodo.style.height = "50%";
    nodoImg.className = "img-btnacces";
    nodoImg.style.backgroundImage = "url('"+ boton[1] +"')"; 
    nodoImg.style.width = "30%";
    nodoImg.style.height = "30%";
    nodoImg.style.backgroundSize = "contain";
    nodoImg.style.backgroundRepeat = "no-repeat";
    nodoText.textContent = boton[2];
    nodoText.style.display = "none";
    nodo.appendChild(nodoImg);
    nodo.appendChild(nodoText);
    menu.appendChild(nodo);
  });
}
