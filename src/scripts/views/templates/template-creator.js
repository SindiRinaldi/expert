import API_ENDPOINT from '../../globals/api-endpoint';

const createWartegDetailTemplate = (warteg) => `
  <h2 class="warteg__title">${warteg.name}</h2>
  <img tabindex="0" class="lazyload warteg__poster" src="${API_ENDPOINT.WARTEG_IMAGE_LARGE + warteg.pictureId}" alt="${warteg.name}" />
  <div class="warteg__info">
  <h3>Information</h3>
    <h4>Tagline</h4>
    <p>${warteg.address}</p>
    <h4>Release Date</h4>
    <p>${warteg.city}</p>
    <h4>Rating</h4>
    <p>${warteg.rating}</p>
    <h4>Categories</h4>
    <p>${warteg.categories.map((categorie) => `${categorie.name}`)}</p>
  </div>
  <div class="warteg__overview">
    <h3>Overview</h3>
    <p>${warteg.description}</p>
  </div>

  <div class="warteg__katalog">
    <h3>Warteg Katalog</h3>
    <div class="warteg__makan">
    <h4>Makanan</h4>
      ${warteg.menus.foods.map((food) => `${food.name}`)}
    </div> 
    <div class="warteg__minum">
    <h4>Minuman</h4>
      ${warteg.menus.drinks.map((drink) => `${drink.name}`)} 
    </div>
    <div class="review">
    <h3>Ulasan</h3>
    <h4>Apa yang pelanggan katakan tentang kami</h4>
    <div class="review__list">
    ${warteg.customerReviews.map((review) => `
      <div class="rev">
        <p class="rev__user">${review.name}</p>
        <p class="rev__def">${review.review}</p>
        <p class="rev__date">${review.date}</p>
      </div>`).join('')}
    </div>
    </div>
</div>
  `;

const createWartegItemTemplate = (warteg) => `
  <div class="warteg-item">
    <div class="warteg-item__header">
      <img tabindex="0" class="lazyload warteg-item__header__poster" alt="${warteg.name || '-'}"
           data-src="${API_ENDPOINT.WARTEG_IMAGE_MEDIUM + warteg.pictureId}">
      <div class="warteg-item__header__rating">
        <p>⭐️<span class="warteg-item__header__rating__score">${warteg.rating || '-'}</span></p>
      </div>
    </div>
    <div class="warteg-item__content">
      <h3 class="warteg__title"><a href="/#/detail/${warteg.id}">${warteg.name || '-'}</a></h3>
      <p>${warteg.description || '-'}
      <a href="/#/detail/${warteg.id}">lebih detail</a></p>
    </div>
  </div>
`;

const createLikeWartegButtonTemplate = () => `
  <button aria-label="like this warteg" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeWartegButtonTemplate = () => `
  <button aria-label="unlike this warteg" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createWartegItemTemplate,
  createWartegDetailTemplate,
  createLikeWartegButtonTemplate,
  createUnlikeWartegButtonTemplate,
};
