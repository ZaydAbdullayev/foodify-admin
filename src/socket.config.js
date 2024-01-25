// socket.js

import io from "socket.io-client";

// Socket bağlantısını yalnızca bir kere oluştur
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
