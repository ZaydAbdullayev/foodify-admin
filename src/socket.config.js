// socket.js

import io from "socket.io-client";
// https://bvtrj1n0-80.euw.devtunnels.ms
// https://backend.foodify.uz
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
