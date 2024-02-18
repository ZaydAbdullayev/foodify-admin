const dep = JSON.parse(localStorage.getItem("department")) || null;
const user = JSON.parse(localStorage.getItem("user"))?.user || {};

export const rePermission = (state = dep, action) => {
  switch (action.type) {
    case "SET_PERMISSION":
      return action.payload;
    default:
      return state;
  }
};

export const resId = (state = user?.id, action) => {
  switch (action.type) {
    case "RES_ID":
      return action.payload;
    default:
      return state;
  }
};

export const acResId = (payload) => ({ type: "RES_ID", payload });
export const acPermission = (payload) => ({
  type: "SET_PERMISSION",
  payload,
});

