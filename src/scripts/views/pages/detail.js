import UrlParser from '../../routes/url-parser';
import WartegDbSource from '../../data/wartegdb-source';
import { createWartegDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteWartegIdb from '../../data/favorite-warteg-idb';

const Detail = {
  async render() {
    return `
        <div id="wartegs" class="content"></div>
        <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const wartegs = await WartegDbSource.detailWarteg(url.id);
    const wartegContainer = document.querySelector('#wartegs');

    wartegContainer.innerHTML = createWartegDetailTemplate(wartegs);
    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteWarteg: FavoriteWartegIdb,
      warteg: {
        id: wartegs.id,
        name: wartegs.name,
        pictureId: wartegs.pictureId,
        city: wartegs.city,
        rating: wartegs.rating,
        description: wartegs.description,
      },
    });
  },
};

export default Detail;
