// socket.js

import io from "socket.io-client";

const socket = io("https://bvtrj1n0-80.euw.devtunnels.ms", {
  transportOptions: {
    polling: {
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    },
  },
});

export default socket;
