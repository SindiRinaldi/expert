import { itActsAsFavoriteWartegModel } from './contract/favoriteWartegContract';

let favoriteWarteg = [];

const FavoriteWartegArray = {
  getWarteg(id) {
    if (!id) {
      return;
    }

    return favoriteWarteg.find((warteg) => warteg.id === id);
  },

  getAllWarteg() {
    return favoriteWarteg;
  },

  putWarteg(warteg) {
    if (!warteg.hasOwnProperty('id')) {
      return;
    }

    if (this.getWarteg(warteg.id)) {
      return;
    }

    favoriteWarteg.push(warteg);
  },

  deleteWarteg(id) {
    favoriteWarteg = favoriteWarteg.filter((warteg) => warteg.id !== id);
  },

  SearchWarteg(query) {
    return this.getAllWarteg()
      .filter((warteg) => {
        const loweredCaseWartegTitle = (warteg.title || '-').toLowerCase();
        const jammedWartegTitle = loweredCaseWartegTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedWartegTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Warteg Array Contract Test Implementation', () => {
  afterEach(() => favoriteWarteg = []);

  itActsAsFavoriteWartegModel(FavoriteWartegArray);
});
