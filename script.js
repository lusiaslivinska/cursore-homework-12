const BASE_URL = "https://swapi.dev/api";


const infoContainer = document.querySelector('.infoContainer');
const characterContainer = document.createElement("div");
const planetContainer = document.createElement('div');
const input = document.querySelector('#inputMovie');

const btn = document.querySelector('#btn');

async function getAllCharacters(){
    let request;

    if (!input.value){
        request = await fetch(`${BASE_URL}/films/2/`);
    }  else {
        request = await fetch(`${BASE_URL}/films/${input.value}/`);
    }       

    const filmInfo = await request.json();
    const CHARACTER_URLS = filmInfo.characters;
    
    CHARACTER_URLS.forEach(getCharacter);
    changeButton();
}


async function getCharacter(CHARACTER_URLS){
    const request = await fetch (CHARACTER_URLS);
    const character = await request.json();
    renderCharacter(character);
}


function renderCharacter(character){
    input.remove();

    const name = document.createElement("h4");
    name.textContent = character.name;
    name.classList.add("character_name");

    const birth_year = document.createElement("a");
    birth_year.textContent = character.birth_year;
    birth_year.classList.add("character_birth");

    const gender = document.createElement("a");
    gender.textContent = character.gender;
    gender.classList.add("character_gender");

    infoContainer.append(characterContainer);
    characterContainer.append(name,birth_year,gender);
     
}  


async function getPlanetsInfo(){
    const request = await fetch(`${BASE_URL}/planets/`);
    const allPlanetsInfo = await request.json();
    const planetsInfo = allPlanetsInfo.results;
    planetsInfo.forEach(renderPlanet);
    characterContainer.remove();
    infoContainer.append(planetContainer);
}


function renderPlanet(planetsInfo){
    const planetName = document.createElement('h4');
    planetName.textContent = planetsInfo.name;
    planetName.classList.add("planet_name");
    planetContainer.append(planetName);   
}
 

function changeButton(){
    btn.remove();
    
    const btnNext = document.createElement('button');
    btnNext.innerText = "Next";
    infoContainer.append(btnNext);

    btnNext.addEventListener("click",()=>{
        getPlanetsInfo();

        btnNext.addEventListener("click",reloadPage);
    });     
}


btn.addEventListener("click",getAllCharacters);


function reloadPage(){
    location.reload();
}



