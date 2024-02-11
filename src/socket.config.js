// socket.js

import io from "socket.io-client";
const base_url = process.env.REACT_APP_SOCKET_BASE_URL;
const socket = io(base_url, {
  transportOptions: {
    polling: {
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    },
  },
});

export default socket;
