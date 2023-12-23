export const reMedia = (state = "", action) => {
  switch (action.type) {
    case "MEDIA":
      return action.payload;
    default:
      return state;
  }
};

export const acMedia = (payload) => ({ type: "MEDIA", payload });
