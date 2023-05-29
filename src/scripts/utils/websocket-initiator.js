import NotificationHelper from './notification-helper';
import API_ENDPOINT from '../globals/api-endpoint';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const warteg = JSON.parse(message.data);

    NotificationHelper.sendNotification({
      title: `${warteg.name} Rekomendasi warteg`,
      options: {
        body: warteg.description,
        image: `${API_ENDPOINT.WARTEG_IMAGE_SMALL + warteg.pictureId}`,
      },
    });
  },
};
export default WebSocketInitiator;
