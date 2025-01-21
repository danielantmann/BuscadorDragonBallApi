const txtCharacter = document.getElementById('txt-character');
const containerCards = document.getElementById('containerCards');

const BASE_URL = 'https://dragonball-api.com/api/characters';
const URL_CHARACTER = 'https://dragonball-api.com/api/characters?name=';

const getApi = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la red: ' + response.statusText);
        }
        const data = await response.json();
        return data.items || data;  
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return [];
    }
}

const createCard = (character) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;

    const descriptionCard = document.createElement('div');
    descriptionCard.classList.add('description-card');

    const name = document.createElement('h2');
    name.textContent = character.name;

    const gender = document.createElement('p');
    gender.textContent = "Gender: " + (character.gender || "N/A");

    const ki = document.createElement('p');
    ki.textContent = "Ki: " + (character.ki || "N/A");

    const race = document.createElement('p');
    race.textContent = "Race: " + (character.race || "N/A");

    descriptionCard.append(name, gender, ki, race);
    card.append(img, descriptionCard);
    containerCards.appendChild(card);
}

const createTransformationCards = (transformations) => {
    transformations.forEach(transformation => {
        createCard(transformation); // Usar la misma función para crear cartas
    });
}

const createAllCharacters = async () => {
    const data = await getApi(`${BASE_URL}?limit=12`);
    data.forEach(createCard);
}

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
              if ( dataEvo = await getApi(`${BASE_URL}/${data[0].id}`)) {
                if (dataEvo.transformations.length > 0) {
                    createTransformationCards(dataEvo.transformations);                    
                }
            }
            } else {
                const noResults = document.createElement('p');
                noResults.textContent = "No se encontraron personajes. Intenta con otro nombre.";
                noResults.classList.add('no-results');
                containerCards.appendChild(noResults);
            }
        } else {
            createAllCharacters();
        }
    }, 300);
}

const raceButtons = document.querySelectorAll('.race-button');
raceButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const race = button.textContent; // Obtener el texto del botón
        containerCards.innerHTML = ""; // Limpiar el contenedor
        const data = await getApi(`${BASE_URL}?race=${race}`); // Hacer la consulta a la API
        if (data.length > 0) {
            data.forEach(createCard);
        } else {
            const noResults = document.createElement('p');
            noResults.textContent = "No se encontraron personajes de la raza " + race + ".";
            noResults.classList.add('no-results');
            containerCards.appendChild(noResults);
        }
    });
});

window.addEventListener('DOMContentLoaded', createAllCharacters);
txtCharacter.addEventListener('keyup', getCharacterByName);