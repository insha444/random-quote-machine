// Array of quotes as fallback (in case the API fails)
const fallbackQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.", author: "Ralph Waldo Emerson" },
  { text: "In three words I can sum up everything I've learned about life: It goes on.", author: "Robert Frost" }
];

const quoteText = document.getElementById("text");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetQuoteButton = document.getElementById("tweet-quote");

// Fetch a random quote from the API
function fetchRandomQuote() {
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = `- ${data.author}`;
      updateTweetLink(data.content, data.author);
    })
    .catch(error => {
      // Fallback to a random quote from the array if API fails
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteText.textContent = `"${randomQuote.text}"`;
      quoteAuthor.textContent = `- ${randomQuote.author}`;
      updateTweetLink(randomQuote.text, randomQuote.author);
      console.error("Error fetching quote:", error);
    });
}

// Update the href for the tweet button
function updateTweetLink(text, author) {
  tweetQuoteButton.href = `https://twitter.com/intent/tweet?text="${text}" - ${author}`;
}

// Event listener for the "New Quote" button
newQuoteButton.addEventListener("click", fetchRandomQuote);

// Initial quote fetch on page load
fetchRandomQuote();
