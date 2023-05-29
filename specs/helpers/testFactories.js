import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriteWartegIdb from '../../src/scripts/data/favorite-warteg-idb';

const createLikeButtonPresenterWithWarteg = async (warteg) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteWarteg: FavoriteWartegIdb,
    warteg,
  });
};

export { createLikeButtonPresenterWithWarteg };
