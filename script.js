const d = document;
const spinner = d.querySelector(".spinner");
const btnNext = d.querySelector(".next");
const btnTweet = d.querySelector(".tweet");
const quotes = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const quoteDisplay = d.querySelector(".quote_text");
const quoteIcon = d.querySelector(".quote-icon");
const bcgImg = d.querySelector(".bg-img");
let images = [
  "D trumph/trump-0.png",
  "D trumph/trump-0.png",
  "D trumph/trump-0.png",
  "D trumph/trump-0.png",
  "D trumph/trump-0.png",
];
let randNum = Math.floor(Math.random() * images.length);

btnNext.addEventListener("click", getQuote);
async function getQuote() {
  spinner.classList.remove("hidden");
  quoteDisplay.classList.add("hidden");
  btnNext.disabled === true;
  try {
    const response = await fetch(quotes);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    displayQuote(json.message);
    const tweetButton = document.querySelector(".tweet a");
    tweetButton.href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      json.message
    )}`;
  } catch {
    alert("failed to load new Quote");
  } finally {
    btnNext.disabled === false;
    spinner.classList.add("hidden");
    quoteDisplay.classList.remove("hidden");
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const newIconColor = `rgb(${r}, ${g}, ${b})`;
    quoteIcon.style.color = newIconColor;
  }
}

function displayQuote(randomQuote) {
  const quoteText = d.querySelector(".quote_text");
  quoteText.textContent = randomQuote;
}
