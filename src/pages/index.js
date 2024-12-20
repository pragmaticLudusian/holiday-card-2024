import "./index.css";
import {
  songsArray,
  cssRoot,
  pageElement,
  cardElement,
  cardFrontElement,
  cardCoverElements,
  cardElements,
  cardContentElement,
  cardHintElement,
  videoElement,
  countdownElement,
  countdownDate,
} from "../utils/constants.js";

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.textContent = `${days}d ${String(hours).padStart(
    2,
    "0"
  )}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(
    2,
    "0"
  )}s`;
}, 1000);

cardFrontElement.addEventListener("click", () => {
  if (getComputedStyle(cardElement)["animation-play-state"] === "paused") {
    // prevent animation interruption
    cardElement.classList.contains("card_opened") ? cardClose() : cardOpen();
  }
});

const snowflakes = [];
for (let i = 0; i < 100; i++) {
  const randomX1 = Math.random() * 100; // 0 ~ 100 vw
  const randomX2 = randomX1 + Math.random() * 60 - 30; // offset -30 ~ +30 vw
  const randomTime = Math.random() * 10000 + 5000; // 5 ~ 15 s
  const randomDelay = Math.random() * 5000; // 0 ~ 5 s
  const snowflakeClass = Math.random() < 0.5 ? "#snow-one" : "#snow-two";
  // const randomHue = Math.random() * 360; // 0 ~ 359

  snowflakes[i] = document
    .querySelector(snowflakeClass)
    .content.cloneNode(true)
    .querySelector(".snow");

  pageElement.appendChild(snowflakes[i]); // add to DOM, THEN animate
  snowflakes[i].animate(
    [
      { left: `${randomX1}vw`, top: "-15px" },
      { left: `${randomX2}vw`, top: "100vh" },
    ],
    {
      duration: randomTime,
      iterations: Infinity,
      delay: randomDelay,
    }
  );
}

window.addEventListener("resize", cardSizeRender);
function cardSizeRender() {
  cssRoot.style.setProperty("--cardheight", `${window.innerHeight * 0.8}px`);

  const offset = window.innerWidth < 900 ? 0 : cardElement.clientWidth * 0.27; // act like a media query
  cssRoot.style.setProperty("--cardwidth", `${offset}px`);

  cardCoverElements[0].style.setProperty(
    "font-size",
    `${(cardElement.clientWidth * 84) / 360}px`
  );

  cardContentElement.style.setProperty(
    "font-size",
    `${(cardElement.clientWidth * 36) / 360}px`
  );

  cardHintElement.style.setProperty(
    "font-size",
    `${(cardElement.clientWidth * 9) / 360}px`
  );
}
cardSizeRender();

function cardOpen() {
  cardElement.classList.add("card_opened");
  const randomSong = Math.floor(Math.random() * 12);
  videoElement.setAttribute(
    "src",
    `https://youtube.com/embed/${songsArray[randomSong]}`
  );
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
    videoElement.setAttribute("src", `data:,`);
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
    pageElement.style.setProperty("--opacity", `${opacity}`);
    if (opacity > 1 || opacity < 0) {
      clearInterval(bgFadeAnimation);
    }
  }, 20);
}
