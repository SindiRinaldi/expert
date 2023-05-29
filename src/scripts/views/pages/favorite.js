import FavoriteWartegIdb from '../../data/favorite-warteg-idb';
import FavoriteWartegSearchView from './liked-wartegs/favorite-warteg-search-view';
import FavoriteWartegSearchPresenter from './liked-wartegs/favorite-warteg-search-presenter';
import FavoriteWartegShowPresenter from './liked-wartegs/favorite-warteg-show-presenter';

const view = new FavoriteWartegSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteWartegSearchPresenter({ view, favoriteWartegs: FavoriteWartegIdb });
    new FavoriteWartegShowPresenter({ view, favoriteWartegs: FavoriteWartegIdb });
  },
};

export default Favorite;
