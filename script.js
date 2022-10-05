let id = 1;
let total = 0;
let movesText = "";
let infoText = "";

const movesElement = document.getElementById("moves");
const infoElement = document.getElementById("info");
const statsHeading = document.getElementById("statsHeading");
const statsText = document.getElementById("statsText")

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

    // get / set page content

    // set picture
    document.getElementById("picture").src = data.sprites.other["official-artwork"].front_default;

    // set name
    document.getElementById("name").textContent = data.forms[0].name;

    // set type chips
    setTypes(data.types);

    // set stats text
    getMovesText(data.moves);
    getInfoText(data.height, data.weight, data.stats);
    statsText.textContent = infoElement.classList.contains("selected") ? infoText : movesText;
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

// TODO: add line breaks
// TODO: handle overflow (large number of moves) - limit displayed moves or add scroll bar
function getMovesText(moves) {
    movesText = moves.reduce((acc, cur) => acc + cur.move.name + "\n", "");
}

// TODO: add line breaks
function getInfoText(height, weight, stats) {
    infoText = "";
    infoText += height / 10 + " m \n";
    infoText += weight / 10 + " kg \n";
    infoText = stats.reduce((acc, cur) => acc + cur.stat.name + ": " + cur.base_stat + "\n", infoText);
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

movesElement.addEventListener(
    "click",
    () => {
        movesElement.classList.add("selected");
        movesElement.classList.remove("grey");
        infoElement.classList.remove("selected");
        infoElement.classList.add("grey");

        statsHeading.textContent = "Moves";
        statsText.textContent = movesText;
});

infoElement.addEventListener(
    "click",
    () => {
        infoElement.classList.add("selected");
        infoElement.classList.remove("grey");
        movesElement.classList.remove("selected");
        movesElement.classList.add("grey");

        statsHeading.textContent = "Info";
        statsText.textContent = infoText;
});

// main
initialize();