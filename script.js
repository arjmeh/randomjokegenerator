// // // get the joke section container
let jokeText = document.getElementById('joke')
let button = document.getElementById('button')
let copybutton = document.getElementById('copybutton')
// // // get the generate joke button
// let generateBtn = document.querySelector("#btn");


// let API =
//   "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

//   function acquireJoke() {
//     fetch(API)
//       .then((info) => info.json())
//       .then((item) => {
//         jokeText.textContent = `${item.joke}`;
//       });
//   }
handleClick()
async function fetchJoke() {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: {
        Accept: "application/json",
      },
    });
    return response.json();
  }
  async function handleClick() {
    const { joke } = await fetchJoke();
    jokeText.innerHTML = joke;
  }
button.addEventListener("click", handleClick);

function copy() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(jokeText);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
}
copybutton.addEventListener("click", copy);