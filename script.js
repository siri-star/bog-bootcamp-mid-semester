let id = 1;
let total = 0;

async function update() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await response.json();

    document.getElementById("picture").src = data.sprites.other["official-artwork"].front_default;
    document.getElementById("name").textContent = data.forms[0].name;
}

async function initialize() {
    const allPokemonResponse = await fetch('https://pokeapi.co/api/v2/ability/?limit=0');
    const allPokemonData = await allPokemonResponse.json();
    total = allPokemonData.count;
    update();
}

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

initialize();