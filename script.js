const createQuoteGenerator = () => {
  const API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
  const TOTAL_IMAGES = 6;
  let currentImageIndex = 0;

  const elements = {
    quoteText: document.querySelector(".quote-text"),
    nextBtn: document.querySelector(".next-btn"),
    tweetBtn: document.querySelector(".tweet-btn"),
    spinner: document.querySelector(".spinner"),
    quoteIcon: document.querySelector(".quote-icon"),
    bgImage: document.querySelector(".bg-img"),
  };

  const handleGetQuote = async () => {
    toggleLoadingState(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch quote");

      const { message } = await response.json();
      updateQuote(message);
      updateColors();
      updateBackgroundImage();
    } catch (error) {
      console.error("Error fetching quote:", error);
      elements.quoteText.textContent =
        "Failed to load quote. Please try again.";
    } finally {
      toggleLoadingState(false);
    }
  };

  const handleTweet = () => {
    const quote = elements.quoteText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quote
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const updateQuote = (quote) => {
    elements.quoteText.textContent = quote;
  };

  const toggleLoadingState = (isLoading) => {
    elements.spinner.classList.toggle("hidden", !isLoading);
    elements.quoteText.style.visibility = isLoading ? "hidden" : "visible";
    elements.nextBtn.disabled = isLoading;
  };

  const updateColors = () => {
    const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    elements.quoteIcon.style.color = randomColor;
  };

  const getRandomImageIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * (TOTAL_IMAGES + 1));
    } while (newIndex === currentImageIndex);
    currentImageIndex = newIndex;
    return newIndex;
  };

  const updateBackgroundImage = () => {
    const newIndex = getRandomImageIndex();
    elements.bgImage.classList.add("fade-out");
    setTimeout(() => {
      elements.bgImage.src = `./assets/trump-${newIndex}.png`;
      elements.bgImage.classList.remove("fade-out");
    }, 300);
  };

  const displayQuote = () => {
    // Initial setup
    elements.quoteText.textContent =
      "Click the 'Generate Quote' button below to start";

    const quoteGenerator = createQuoteGenerator();
    quoteGenerator.init();
  };

  const init = () => {
    elements.nextBtn.addEventListener("click", handleGetQuote);
    elements.tweetBtn.addEventListener("click", handleTweet);
  };

  return {
    init,
    getNewQuote: handleGetQuote,
    displayQuote,
  };
};

const quoteApp = createQuoteGenerator();
quoteApp.displayQuote();
