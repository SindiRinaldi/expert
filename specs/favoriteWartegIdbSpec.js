import { itActsAsFavoriteWartegModel } from './contract/favoriteWartegContract';
import FavoriteWartegIdb from '../src/scripts/data/favorite-warteg-idb';

describe('Favorite Warteg Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteWartegIdb.getAllWarteg()).forEach(async (warteg) => {
      await FavoriteWartegIdb.deleteWarteg(warteg.id);
    });
  });

  itActsAsFavoriteWartegModel(FavoriteWartegIdb);
});
