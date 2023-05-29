import FavoriteWartegIdb from '../src/scripts/data/favorite-warteg-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Warteg', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteWartegIdb.putWarteg({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteWartegIdb.deleteWarteg(1);
  });

  it('should display unlike widget when the warteg has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this warteg"]'))
      .toBeTruthy();
  });

  it('should not display like widget when the warteg has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    expect(document.querySelector('[aria-label="like this warteg"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked warteg from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    document.querySelector('[aria-label="unlike this warteg"]').dispatchEvent(new Event('click'));

    expect(await FavoriteWartegIdb.getAllWarteg()).toEqual([]);
  });

  it('should not throw error if the unliked warteg is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    await FavoriteWartegIdb.deleteWarteg(1);

    document.querySelector('[aria-label="unlike this warteg"]').dispatchEvent(new Event('click'));

    expect(await FavoriteWartegIdb.getAllWarteg()).toEqual([]);
  });
});
