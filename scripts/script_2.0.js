const characterListEl = document.getElementById('characterList');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumberDisplay = document.getElementById('pageCount');

let characters = [];
let currentPage = 1;
if (localStorage.currentPagePagination) {
  currentPage = localStorage.currentPagePagination;
}

const fetchCharacters = (page) => {
  if (page === 1) {
    prevPageBtn.setAttribute('disabled', true);
  } else {
    prevPageBtn.removeAttribute('disabled');
  }
  pageNumberDisplay.innerText = `Page: ${page}`;
  fetch(`https://swapi.dev/api/people/?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      characters = data.results;
      characterListEl.innerHTML = '';
      characters.forEach((character) => {
        const li = document.createElement('li');
        li.innerText = character.name;
        li.classList.add('characters-list');
        li.addEventListener('click', () => showCharacterDetails(character));
        characterListEl.appendChild(li);
      });
    });
};

const showPrevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    localStorage.currentPagePagination = currentPage;
    fetchCharacters(currentPage);
  }
};

const showNextPage = () => {
  currentPage++;
  localStorage.currentPagePagination = currentPage;
  fetchCharacters(currentPage);
};

prevPageBtn.addEventListener('click', showPrevPage);
nextPageBtn.addEventListener('click', showNextPage);

fetchCharacters(currentPage);

// Отображение деталей персонажа
const characterDetailsEl = document.querySelector('.character-details');
const backToListBtn = document.getElementById('back-to-list');
const nameEl = document.getElementById('name');
const birthYearEl = document.getElementById('birth-year');
const genderEl = document.getElementById('gender');
const filmsEl = document.getElementById('films');
const homeworldEl = document.getElementById('homeworld');
const speciesEl = document.getElementById('species');

const showCharacterDetails = (character) => {
  nameEl.innerText = character.name;
  birthYearEl.innerText = character.birth_year;
  genderEl.innerText = character.gender;

  filmsEl.innerHTML = '';
  character.films.forEach((filmUrl) => {
    fetch(filmUrl)
      .then((response) => response.json())
      .then((film) => {
        const li = document.createElement('li');
        li.innerText = film.title;
        filmsEl.appendChild(li);
      });
  });

  fetch(character.homeworld)
    .then((response) => response.json())
    .then((planet) => {
      homeworldEl.innerText = planet.name;
    });

  fetch(character.species[0])
    .then((response) => response.json())
    .then((specie) => {
      speciesEl.innerText = specie.name;
    });

  characterDetailsEl.style.display = 'block';
};

const backToList = () => {
  characterDetailsEl.style.display = 'none';
};

backToListBtn.addEventListener('click', backToList);
