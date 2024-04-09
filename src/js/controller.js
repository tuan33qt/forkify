import * as model from './model.js';
import recipeView from './view/recipeView.js';
import resultsView from './view/resultsView.js';
import searchView from './view/searchView.js';
import paginationView from './view/paginationView.js';
// import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};
const controlServing = function (update) {
  model.updateServings(update);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deletebookmark(model.state.id);
  recipeView.update(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookMark(controlAddBookMark);
};
init();
