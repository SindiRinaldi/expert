import {
  createLikeWartegButtonTemplate,
  createUnlikeWartegButtonTemplate,
} from '../views/templates/template-creator';
import FavoriteWartegIdb from '../data/favorite-warteg-idb';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, warteg }) {
    this._likeButtonContainer = likeButtonContainer;
    this._warteg = warteg;
    this._favoriteWarteg = FavoriteWartegIdb;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._warteg;

    if (await this._isWartegExist(id)) {
      this._renderUnlike();
    } else {
      this._renderLike();
    }
  },

  async _isWartegExist(id) {
    const warteg = await this._favoriteWarteg.getWarteg(id);
    return !!warteg;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeWartegButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteWarteg.putWarteg(this._warteg);
      this._renderButton();
    });
  },

  _renderUnlike() {
    this._likeButtonContainer.innerHTML = createUnlikeWartegButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteWarteg.deleteWarteg(this._warteg.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
