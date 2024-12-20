export const songsArray = [
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

export const cssRoot = document.querySelector(":root");

export const pageElement = document.querySelector(".page");

export const cardElement = document.querySelector(".card");
export const cardFrontElement = cardElement.querySelector(".card__front");
export const cardCoverElements = cardElement.querySelectorAll(".card__cover");
export const cardElements = [cardElement, cardFrontElement].concat(
  Array.from(cardCoverElements)
);

export const cardContentElement = cardElement.querySelector(".card__content");
export const cardHintElement = cardElement.querySelector(".card__hint");

export const videoElement = cardElement.querySelector(".card__video");

export const countdownElement = cardElement.querySelector(".card__countdown");
export const countdownDate = new Date("Dec 25, 2024").getTime();
