import axios from "axios";
const base_url = "https://backend.foodify.uz";
// const base_url = "https://bvtrj1n0-8081.euw.devtunnels.ms";
const user = JSON.parse(localStorage.getItem("user")) || [];

const config = {
  headers: {
    Authorization: `Bearer ${user.token}`,
    "Content-Type": "application/json; multipart/form-data",
  },
};

export const ApiService = {
  async fetching(url, data) {
    const response = await axios.post(`${base_url}/${url}`, data, config);
    return response;
  },
};

export const ApiGetService = {
  async fetching(url) {
    const response = await axios.get(`${base_url}/${url}`);
    return response;
  },
};

export const ApiUpdateService = {
  async fetching(url, data) {
    const response = await axios.patch(`${base_url}/${url}`, data, config);
    return response;
  },
};

export const ApiDeleteService = {
  async fetching(url) {
    const response = await axios.delete(`${base_url}/${url}`);
    return response;
  },
};

//  export const getProduct = (checkedData, item, status) => {
//    const isChecked = checkedData.some((i) => i.id === item?.id);
//    if (status === 0) {
//      setCheckedData((prevData) => prevData.filter((i) => i.id !== item?.id));
//      return;
//    }
//    if (isChecked) {
//      setCheckedData((prevData) =>
//        prevData.map((i) => (i.id === item?.id ? item : i))
//      );
//    } else {
//      setCheckedData((prevData) => [...prevData, item]);
//    }
//  };
