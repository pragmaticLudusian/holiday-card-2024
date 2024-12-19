const songsArray = [
  "uceNmJSyXGw",
  "pW-RcN7mxZc",
  "Y_GlTjwPjFA",
  "88InoQyyP3w",
  "MiH7NaaqtTs",
  "e3KrI4lBeps",
  "lGlhq-0uyfA",
  "kJuWPRq-mwM",
  "zd2i3UAXm44",
  "jnxwkFMJjts",
  "bUIkTPzkLHE",
  "sRy0RJ96gxM",
];

const cssRoot = document.querySelector(":root");
const cssRootStyle = getComputedStyle(cssRoot);

const cardElement = document.querySelector(".card");
const cardCoverElement = document.querySelector(".card__front");
cardSizeRender();

cardCoverElement.addEventListener("click", () => {
  if (getComputedStyle(cardElement)["animation-play-state"] === "paused") {
    // prevent animation interruption
    cardElement.classList.contains("card_opened") ? cardClose() : cardOpen();
  }
});

window.addEventListener("resize", cardSizeRender);
function cardSizeRender() {
  cssRoot.style.setProperty("--cardheight", `${window.innerHeight * 0.8}px`);
  cssRoot.style.setProperty(
    "--cardwidth",
    `${cardElement.clientWidth * 0.59}px`
  );
}

function cardOpen() {
  cardElement.classList.add("card_opened");
  const randomNum = Math.floor(Math.random() * 12);
  console.log(`https://youtu.be/${songsArray[randomNum]}`);

  cardResetAnimation();
  cardSetAnimation("running");
  setTimeout(() => {
    cardSetAnimation("paused");
  }, 3000);
}

function cardClose() {
  cardResetAnimation(); // so that the reverse can work properly
  cardSetAnimation("running", "reverse");
  setTimeout(() => {
    cardSetAnimation("paused", "reverse");
  }, 3000);
  cardElement.classList.remove("card_opened");
}

function cardSetAnimation(state, dir = "normal") {
  cardElement.style.animationDirection = dir;
  cardElement.style.animationPlayState = state;
  cardCoverElement.style.animationDirection = dir;
  cardCoverElement.style.animationPlayState = state;
}
function cardResetAnimation() {
  cardElement.style.animation = "none";
  cardElement.offsetHeight; // reflow
  cardElement.style.animation = null;
  cardCoverElement.style.animation = "none";
  cardCoverElement.offsetHeight; // reflow
  cardCoverElement.style.animation = null;
}
