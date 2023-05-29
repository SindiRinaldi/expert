class FavoriteWartegSearchPresenter {
  constructor({ favoriteWartegs, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteWartegs = favoriteWartegs;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchWarteg(latestQuery);
    });
  }

  async _searchWarteg(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundWartegs;
    if (this._latestQuery.length > 0) {
      foundWartegs = await this._favoriteWartegs.SearchWarteg(this.latestQuery);
    } else {
      foundWartegs = await this._favoriteWartegs.getAllWarteg();
    }

    this._showFoundWartegs(foundWartegs);
  }

  _showFoundWartegs(wartegs) {
    this._view.showFavoriteWartegs(wartegs);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteWartegSearchPresenter;
