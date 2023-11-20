export const reActive = (state = null, action) => {
  switch (action.type) {
    case "ACTIVE_ITEM":
      return action.payload;
    default:
      return state;
  }
};

export const acActive = (payload) => ({ type: "ACTIVE_ITEM", payload });
