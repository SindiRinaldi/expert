import CONFIG from './config';

const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}list`,
  WARTEG_IMAGE_MEDIUM: `${CONFIG.BASE_URL}images/medium/`,
  WARTEG_IMAGE_SMALL: `${CONFIG.BASE_URL}images/small/`,
  WARTEG_IMAGE_LARGE: `${CONFIG.BASE_URL}images/large/`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
};

export default API_ENDPOINT;
