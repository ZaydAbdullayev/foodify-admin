export const reSearch = (state = "", action) => {
  switch (action.type) {
    case "SEARCH":
      return action.payload;
    default:
      return state;
  }
};

export const acSearch = (payload) => ({ type: "SEARCH", payload });
