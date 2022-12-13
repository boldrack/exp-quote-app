const AllCategories = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communications",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];

const categorySelectorElement = document.querySelector(".quote-toolbox select");
const quoteContainerElement = document.querySelector(".quote-container");
const loaderElement = document.querySelector(".loader");

let quoteStore = [];

const setLoader = () => (loaderElement.style.display = "flex");
const unsetLoader = () => (loaderElement.style.display = "none");

const setQuoteStore = (freshQuotes) => {
  quoteStore = freshQuotes;
};

const prepopulateCategories = () => {
  AllCategories.forEach((categoryText) =>
    categorySelectorElement.insertAdjacentHTML(
      "beforeEnd",
      `<option value="${categoryText}">${categoryText}</option>`
    )
  );
  // set the first option as the selected item
  categorySelectorElement
    .querySelector("option")
    .setAttribute("selected", true);
};

const getSelectedCategory = () => {
  return categorySelectorElement.selectedOptions[0].value;
};

const renderQuote = (quoteIndex) => {
  if (quoteIndex > quoteStore.length) renderQuoteText(quoteStore[0]);

  const quoteText = quoteStore.at(quoteIndex);
  console.log("rendering ... ", quoteText);
  renderQuoteText(quoteText);
};

const renderQuoteText = (quoteText) => {
  quoteContainerElement.innerText = quoteText;
};

const fetchCategories = async (categoryText) => {
  setLoader();
  const response = await fetch(
    `https://api.api-ninjas.com/v1/quotes/?category=${categoryText}&limit=10`,
    {
      headers: {
        "X-Api-Key": "smTtvFpU8McS5EVM9AXaqw==F28aVGJFlvN1tcP7",
      },
    }
  );
  const responseJson = await response.json();
  unsetLoader();
  return responseJson.map((quote) => quote.quote);
};

categorySelectorElement.addEventListener("change", async (event) => {
  // refetch data store on change
  const newCategoryText = getSelectedCategory();
  const quoteTexts = await fetchCategories(newCategoryText);
  console.log(quoteTexts);
  setQuoteStore(quoteTexts);
  renderQuote(0);
});

/**
 * Main body
 */
unsetLoader();
prepopulateCategories();
