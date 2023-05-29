import FavoriteWartegSearchView from '../src/scripts/views/pages/liked-wartegs/favorite-warteg-search-view';
import FavoriteWartegShowPresenter from '../src/scripts/views/pages/liked-wartegs/favorite-warteg-show-presenter';
import FavoriteWartegIdb from '../src/scripts/data/favorite-warteg-idb';

describe('Showing all favorite wartegs', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteWartegSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no wartegs have been liked', () => {
    it('should ask for the favorite wartegs', () => {
      const favoriteWartegs = spyOnAllFunctions(FavoriteWartegIdb);

      new FavoriteWartegShowPresenter({
        view,
        favoriteWartegs,
      });

      expect(favoriteWartegs.getAllWarteg).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no wartegs have been liked', (done) => {
      document.getElementById('wartegs').addEventListener('wartegs:updated', () => {
        expect(document.querySelectorAll('.warteg-item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteWartegs = spyOnAllFunctions(FavoriteWartegIdb);
      favoriteWartegs.getAllWarteg.and.returnValues([]);

      new FavoriteWartegShowPresenter({
        view,
        favoriteWartegs,
      });
    });
  });

  describe('When favorite wartegs exist', () => {
    it('should show the wartegs', (done) => {
      document.getElementById('wartegs').addEventListener('wartegs:updated', () => {
        expect(document.querySelectorAll('.warteg-item').length).toEqual(2);
        done();
      });

      const favoriteWartegs = spyOnAllFunctions(FavoriteWartegIdb);
      favoriteWartegs.getAllWarteg.and.returnValues([
        {
          id: 11, title: 'A', vote_average: 3, overview: 'Sebuah warteg a',
        },
        {
          id: 11, title: 'B', vote_average: 4, overview: 'Sebuah menu B',
        },
      ]);

      new FavoriteWartegShowPresenter({
        view,
        favoriteWartegs,
      });
    });
  });
});
