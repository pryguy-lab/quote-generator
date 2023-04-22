const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
const loader = document.getElementById("loader");

let apiQuotes = [];
function loaderAnimation() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoaderAnimation() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loaderAnimation();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.author == "Anonymous") {
    authorText.textContent = "Mr. Awesomeness";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 200) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  removeLoaderAnimation();
}

async function getQuotes() {
  loaderAnimation();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
  } catch (error) {}
}
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

getQuotes();
