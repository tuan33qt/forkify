import icons from 'url:../../img/icons.svg';
export default class View {
  #data;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() != ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}
