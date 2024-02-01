// socket.js

import io from "socket.io-client";

const socket = io("https://backup.foodify.uz", {
  transportOptions: {
    polling: {
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    },
  },
});

export default socket;
