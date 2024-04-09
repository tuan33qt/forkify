import View from './view';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curentPage = this._data.page;
    const numsPage = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    if (curentPage === 1 && numsPage > 1) {
      return `<button data-goto="${
        curentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>${curentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    }
    if (curentPage === numsPage && numsPage > 1) {
      return `<button  data-goto="${
        curentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${curentPage - 1}</span>
    </button>`;
    }
    if (curentPage < numsPage) {
      return `<button  data-goto="${
        curentPage - 1
      }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>${curentPage - 1}</span>
  </button>
  <button  data-goto="${
    curentPage + 1
  }" class="btn--inline pagination__btn--next">
    <span>${curentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    }
    return '';
  }
}
export default new PaginationView();
