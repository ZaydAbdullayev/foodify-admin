export const reNavStatus = (state = 0, action) => {
  switch (action.type) {
    case "STATUS":
      return action.payload;
    default:
      return state;
  }
};

export const acNavStatus = (payload) => ({ type: "STATUS", payload });
