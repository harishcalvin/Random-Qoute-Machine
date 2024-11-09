const createQuoteGenerator = () => {
  const API_URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
  const TOTAL_IMAGES = 6;
  let currentImageIndex = 0;
  let isFirstQuote = true;

  const CREDITS_CONFIG = {
    twitter: "@harish_calvin",
    previewUrl: window.location.href,
  };

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

      if (isFirstQuote) {
        celebrateQuote();
        isFirstQuote = false;
      }
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

    const getCredits = (quoteLength) => {
      if (quoteLength > 180) {
        // minimal credits
        return `\n\n🔗 ${CREDITS_CONFIG.previewUrl}\n#JavaScript`;
      }
      // full credits
      return `\n- D Trump\n💻 By @${CREDITS_CONFIG.twitter}\n🔗 ${CREDITS_CONFIG.previewUrl}\n#JavaScript`;
    };

    const credits = getCredits(quote.length);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quote + credits
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
    elements.quoteText.textContent =
      "Click the 'Generate Quote' button below to start";
  };

  const init = () => {
    elements.nextBtn.addEventListener("click", handleGetQuote);
    elements.tweetBtn.addEventListener("click", handleTweet);
  };

  const celebrateQuote = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#B31942", "#0A3161", "#FFD700"],
    });
  };

  return {
    init,
  };
};

const quoteApp = createQuoteGenerator();
quoteApp.init();
