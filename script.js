import fetch from "node-fetch";

const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
const data = await response.json();

document.getElementById("picture").src= searchPic.src;