let id = 1;
let total = 0;

const typeDictionary = {
    "normal": "A8A77A",
    "fire": "EE8130",
    "water": "6390F0",
    "electric": "F7D02C",
    "grass": "7AC74C",
    "ice": "96D9D6",
    "fighting": "C22E28",
    "poison": "A33EA1",
    "ground": "E2BF65",
    "flying": "A98FF3",
    "psychic": "F95587",
    "bug": "A6B91A",
    "rock": "B6A136",
    "ghost": "735797",
    "dragon": "6F35FC",
    "dark": "705746",
    "steel": "B7B7CE",
    "fairy": "D685AD"
}

async function update() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await response.json();

    document.getElementById("picture").src = data.sprites.other["official-artwork"].front_default;
    document.getElementById("name").textContent = data.forms[0].name;
    setTypes(data.types);

}

async function initialize() {
    const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/ability/?limit=0');
    const allPokemonData = await allPokemonResponse.json();
    total = allPokemonData.count;
    update();
}

function setTypes(types) {
    typeChipContainer = document.getElementById("typeChipContainer");
    typeChipContainer.innerHTML = null;
    types.forEach((type) => {
        const typeChip = document.createElement("p");
        typeChip.classList.add("typeChip");
        typeChip.textContent = type.type.name;
        typeChip.style.backgroundColor = typeDictionary[type.type.name];
        typeChipContainer.appendChild(typeChip);
    });
}

// event handlers

document.getElementById("back").addEventListener(
    "click",
    () => {
        // TODO: unintuitive, use modular arithmatic
        id = id - 1 < 1 ? total : id - 1;
        update();
});

document.getElementById("forward").addEventListener(
    "click",
    () => {
        // TODO: unintuitive, use modular arithmatic
        id = id + 1 > total ? 1 : id + 1;
        update();
});

const moves = document.getElementById("moves")
moves.addEventListener(
    "click",
    () => {
        moves.classList.add("selected");
        moves.classList.remove("grey");
        info.classList.remove("selected");
        info.classList.add("grey");
});

const info = document.getElementById("info")
info.addEventListener(
    "click",
    () => {
        info.classList.add("selected");
        info.classList.remove("grey");
        moves.classList.remove("selected");
        moves.classList.add("grey");
});

//main
initialize();