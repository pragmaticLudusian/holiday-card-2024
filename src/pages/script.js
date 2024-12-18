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
cardHeightRender();

const cardCoverElement = document.querySelector(".card__front");
cardCoverElement.addEventListener("click", () => {
  if (getComputedStyle(cardCoverElement)["animation-play-state"] === "paused") {
    // prevent animation interruption
    cardCoverElement.classList.contains("card__front_opened")
      ? cardClose()
      : cardOpen();
  }
});

window.addEventListener("resize", cardHeightRender);
function cardHeightRender() {
  cssRoot.style.setProperty("--cardheight", `${window.innerHeight * 0.8}px`);
}

function cardOpen() {
  cardCoverElement.classList.add("card__front_opened");
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
  cardCoverElement.classList.remove("card__front_opened");
}

function cardSetAnimation(state, dir = "normal") {
  cardCoverElement.style.animationDirection = dir;
  cardCoverElement.style.animationPlayState = state;
}
function cardResetAnimation() {
  cardCoverElement.style.animation = "none";
  cardCoverElement.offsetHeight; // reflow
  cardCoverElement.style.animation = null;
}
