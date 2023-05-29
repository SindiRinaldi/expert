import API_ENDPOINT from '../globals/api-endpoint';

class WartegDbSource {
  static async listWarteg() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailWarteg(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default WartegDbSource;
