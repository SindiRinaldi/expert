class FavoriteWartegShowPresenter {
  constructor({ view, favoriteWartegs }) {
    this._view = view;
    this._favoriteWartegs = favoriteWartegs;
    this._showFavoriteWartegs();
  }

  async _showFavoriteWartegs() {
    const wartegs = await this._favoriteWartegs.getAllWarteg();
    this._displayWartegs(wartegs);
  }

  _displayWartegs(wartegs) {
    this._view.showFavoriteWartegs(wartegs);
  }
}

export default FavoriteWartegShowPresenter;
