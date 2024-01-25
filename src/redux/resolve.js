export const resolve = (state = {}, action) => {
  switch (action.type) {
    case "RESOLVE":
      return action.payload;
    default:
      return state;
  }
};

export const acResolve = (payload) => ({ type: "RESOLVE", payload });
