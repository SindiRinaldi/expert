import FavoriteWartegIdb from '../src/scripts/data/favorite-warteg-idb';
// eslint-disable-next-line no-unused-vars
import * as TestFactories from './helpers/testFactories';

describe('Liking A warteg', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the Warteg has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    expect(document.querySelector('[aria-label="like this warteg"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the Warteg has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this Warteg"]')).toBeFalsy();
  });

  it('should be able to like the Warteg', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const Warteg = await FavoriteWartegIdb.getWarteg(1);

    expect(Warteg).toEqual({ id: 1 });

    FavoriteWartegIdb.deleteWarteg(1);
  });

  it('should not add a Warteg again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ id: 1 });

    // Tambahkan Warteg dengan ID 1 ke daftar Warteg yang disukai
    await FavoriteWartegIdb.putWarteg({ id: 1 });
    // Simulasikan pengguna menekan tombol suka Warteg
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // tidak ada Warteg yang ganda
    expect(await FavoriteWartegIdb.getAllWarteg()).toEqual([{ id: 1 }]);

    FavoriteWartegIdb.deleteWarteg(1);
  });

  // menggunakan metode xit, bukan it
  it('should not add a Warteg when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithWarteg({ });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteWartegIdb.getAllWarteg()).toEqual([]);
  });
});
