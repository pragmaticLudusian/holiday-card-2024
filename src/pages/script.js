const songArray = [
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

const cardElement = document.querySelector(".card__front");
cardElement.addEventListener("click", () => {
  const randomNum = Math.floor(Math.random() * 12);
  console.log(`https://youtu.be/${songArray[randomNum]}`);
});

window.addEventListener("resize", cardHeightRender);
function cardHeightRender() {
  cssRoot.style.setProperty("--cardheight", `${window.innerHeight * 0.8}px`);
}
