// socket.js

import io from "socket.io-client";
const base_url = process.env.REACT_APP_SOCKET_BASE_URL;
// const base_url = "https://tmm428sh-8080.euw.devtunnels.ms";
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
