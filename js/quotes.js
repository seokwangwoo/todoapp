const quotes = [
  {
    quote: "Quote1",
    author: "Author1",
  },
  {
    quote: "Quote2",
    author: "Author2",
  },
  {
    quote: "Quote3",
    author: "Author3",
  },
  {
    quote: "Quote4",
    author: "Author4",
  },
  {
    quote: "Quote5",
    author: "Author5",
  },
  {
    quote: "Quote6",
    author: "Author6",
  },
  {
    quote: "Quote7",
    author: "Author7",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

function setQuote() {
  const length = quotes.length;
  const randomIndex = Math.floor(Math.random() * length);
  const element = quotes[randomIndex];

  quote.innerText = element.quote;
  author.innerText = element.author;
}

setInterval(setQuote, 1000);
