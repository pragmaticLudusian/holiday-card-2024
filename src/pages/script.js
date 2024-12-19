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

const pageElement = document.querySelector(".page");

const cardElement = document.querySelector(".card");
const cardFrontElement = cardElement.querySelector(".card__front");
const cardCoverElements = cardElement.querySelectorAll(".card__cover");
const cardElements = [cardElement, cardFrontElement].concat(
  Array.from(cardCoverElements)
);
console.log(cardElements);

const cardTitleElement = cardElement.querySelector(".card__title");
cardSizeRender();

cardFrontElement.addEventListener("click", () => {
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
    `${cardElement.clientWidth * 0.27}px`
  );
  cardTitleElement.style.setProperty(
    "font-size",
    `${(cardElement.clientWidth * 84) / 360}px`
  );
}

function cardOpen() {
  cardElement.classList.add("card_opened");
  const randomNum = Math.floor(Math.random() * 12);
  console.log(`https://youtu.be/${songsArray[randomNum]}`);
  backgroundFadeAnimation("in");
  cardResetAnimation();
  cardSetAnimation("running");
  setTimeout(() => {
    cardSetAnimation("paused");
  }, 1000);
}

function cardClose() {
  backgroundFadeAnimation("out");
  cardResetAnimation(); // so that the reverse can work properly
  cardSetAnimation("running", "reverse");
  setTimeout(() => {
    cardSetAnimation("paused", "reverse");
  }, 1000);
  cardElement.classList.remove("card_opened");
}

function cardSetAnimation(state, dir = "normal") {
  cardElements.forEach((elem) => {
    elem.style.animationDirection = dir;
    elem.style.animationPlayState = state;
  });
}
function cardResetAnimation() {
  cardElements.forEach((elem) => {
    elem.style.animation = "none";
    elem.offsetHeight; // reflow
    elem.style.animation = null;
  });
}

function backgroundFadeAnimation(animation) {
  // a pseudo element would need an alternate method of setting bg opacity
  let opacity = animation === "in" ? 0 : 1;
  const bgFadeAnimation = setInterval(() => {
    animation === "in" ? (opacity += 0.016) : (opacity -= 0.02);
    pageElement.style.setProperty("--bgopacity", `${opacity}`);
    if (opacity > 1 || opacity < 0) {
      clearInterval(bgFadeAnimation);
    }
  }, 20);
}
