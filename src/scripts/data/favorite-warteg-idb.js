import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteWartegIdb = {
  async getWarteg(id) {
    if (!id) {
      return;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllWarteg() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putWarteg(warteg) {
    if (!warteg.hasOwnProperty('id')) {
      return;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, warteg);
  },
  async deleteWarteg(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

  async SearchWarteg(query) {
    return (await this.getAllWarteg()).filter((warteg) => {
      const loweredCaseWartegTitle = (warteg.title || '-').toLowerCase();
      const jammedWartegTitle = loweredCaseWartegTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedWartegTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

export default FavoriteWartegIdb;
