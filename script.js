// // // get the joke section container
let jokeText = document.getElementById('joke')
let button = document.getElementById('button')
let undoButton = document.getElementById('undoButton'); // Get the Undo button
let previousJoke = ""; // Store the previous joke
let copybutton = document.getElementById('copybutton')

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
    if (jokeText.textContent) {
        previousJoke = jokeText.textContent; // Save the current joke as the previous joke
    }
    const { joke } = await fetchJoke();
    jokeText.textContent = joke; // Update the current joke display
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

function undoJoke() {
  if (previousJoke) {
      const currentJoke = jokeText.textContent;
      jokeText.textContent = previousJoke; // Restore the previous joke
      previousJoke = currentJoke; // Save the current joke as the new "previous" for further undos
  } else {
      alert("No previous joke to undo!");
  }
}
undoButton.addEventListener("click", undoJoke); // Attach event listener to Undo button

async function handleClick() {
  document.getElementById("loading").style.display = "block";
  if (jokeText.textContent) {
      previousJoke = jokeText.textContent;
  }
  const { joke } = await fetchJoke();
  jokeText.textContent = joke;
  document.getElementById("loading").style.display = "none";
}

const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', async () => {
    const jokeTextContent = document.getElementById('joke').textContent;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Check out this pun!',
                text: jokeTextContent,
                url: window.location.href, // Optional: Include the current page URL
            });
            alert('Joke shared successfully!');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Sharing is not supported on this browser.');
    }
});

if (!navigator.share) {
  shareButton.addEventListener('click', () => {
      const jokeTextContent = document.getElementById('joke').textContent;
      navigator.clipboard.writeText(jokeTextContent).then(() => {
          alert('Joke copied to clipboard! Share it anywhere.');
      });
  });
}