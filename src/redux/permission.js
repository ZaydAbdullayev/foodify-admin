const dep = JSON.parse(localStorage.getItem("department")) || null;

export const rePermission = (state = dep, action) => {
  switch (action.type) {
    case "SET_PERMISSION":
      return action.payload;
    default:
      return state;
  }
};

export const acPermission = (payload) => ({
  type: "SET_PERMISSION",
  payload,
});
