import FavoriteWartegSearchPresenter from '../src/scripts/views/pages/liked-wartegs/favorite-warteg-search-presenter';
import FavoriteWartegIdb from '../src/scripts/data/favorite-warteg-idb';
import FavoriteWartegSearchView from '../src/scripts/views/pages/liked-wartegs/favorite-warteg-search-view';

describe('Searching wartegs', () => {
  let presenter;
  let favoriteWartegs;
  let view;

  const SearchWarteg = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setWartegSearchContainer = () => {
    view = new FavoriteWartegSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteWartegs = spyOnAllFunctions(FavoriteWartegIdb);
    presenter = new FavoriteWartegSearchPresenter({
      favoriteWartegs,
      view,
    });
  };

  beforeEach(() => {
    setWartegSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      SearchWarteg('warteg a');

      expect(presenter.latestQuery)
        .toEqual('warteg a');
    });

    it('should ask the model to search for wartegs', () => {
      SearchWarteg('warteg a');

      expect(favoriteWartegs.SearchWarteg)
        .toHaveBeenCalledWith('warteg a');
    });

    it('should show the found wartegs', () => {
      presenter._showFoundWartegs([{ id: 1 }]);
      expect(document.querySelectorAll('.warteg-item').length)
        .toEqual(1);

      presenter._showFoundWartegs([{
        id: 1,
        title: 'Satu',
      }, {
        id: 2,
        title: 'Dua',
      }]);
      expect(document.querySelectorAll('.warteg-item').length)
        .toEqual(2);
    });

    it('should show the title of the found wartegs', () => {
      presenter._showFoundWartegs([{
        id: 1,
        name: 'Satu',
      }]);

      expect(document.querySelectorAll('.warteg__title')
        .item(0).textContent)
        .toEqual('Satu');
    });

    it('should show - when the warteg returned does not contain a title', (done) => {
      document.getElementById('wartegs').addEventListener('wartegs:updated', () => {
        const wartegTitles = document.querySelectorAll('.warteg__title');
        expect(wartegTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteWartegs.SearchWarteg.withArgs('warteg a').and.returnValues([
        { id: 444 },
      ]);

      SearchWarteg('warteg a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      SearchWarteg(' ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      SearchWarteg('    ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      SearchWarteg('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      SearchWarteg('\t');
      expect(presenter.latestQuery.length)
        .toEqual(0);
    });

    it('should show all favorite wartegs', () => {
      SearchWarteg('    ');

      expect(favoriteWartegs.getAllWarteg)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite wartegs could be found', () => {
    it('should show the empty meesage', (done) => {
      document.getElementById('wartegs').addEventListener('wartegs:updated', () => {
        expect(document.querySelectorAll('.warteg-item__not__found').length).toEqual(1);
        done();
      });

      favoriteWartegs.SearchWarteg.withArgs('warteg a').and.returnValues([]);

      SearchWarteg('warteg a');
    });

    it('should not show any warteg', (done) => {
      document.getElementById('wartegs').addEventListener('wartegs:updated', () => {
        expect(document.querySelectorAll('.warteg-item').length)
          .toEqual(0);
        done();
      });

      favoriteWartegs.SearchWarteg.withArgs('warteg a')
        .and
        .returnValues([]);

      SearchWarteg('warteg a');
    });
  });
});
