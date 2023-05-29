import { createWartegItemTemplate } from '../../templates/template-creator';

class FavoriteWartegSearchView {
  getTemplate() {
    return `
        <div class="content">
            <input id="query" type="text">
            <h2 class="content__heading">Your Liked Warteg</h2>
                <div id="wartegs" class="wartegs">
                </div>
        </div>
        `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showWartegs(wartegs) {
    this._showFavoriteWartegs(wartegs);
  }

  showFavoriteWartegs(wartegs = []) {
    let html;
    if (wartegs.length) {
      html = wartegs.reduce((carry, warteg) => carry.concat(createWartegItemTemplate(warteg)), '');
    } else {
      html = this._getEmptyWartegTemplate();
    }

    document.getElementById('wartegs').innerHTML = html;

    document.getElementById('wartegs').dispatchEvent(new Event('wartegs:updated'));
  }

  _getEmptyWartegTemplate() {
    return '<div class="warteg-item__not__found wartegs__not__found"> Tidak ada warteg untuk ditampilkan </div>';
  }
}

export default FavoriteWartegSearchView;
