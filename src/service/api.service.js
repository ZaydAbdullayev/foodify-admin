import axios from "axios";

const base_url = "https://yandex.sp-school58.uz";

const config = {
  headers: {
    "Content-Type": "application/json; multipart/form-data",
  },
};

export const ApiService = {
  async fetching(url, data) {
    const response = await axios.post(`${base_url}/${url}`, data, config);
    return response;
  },
};
