export const reCalc = (state = {}, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    default:
      return state;
  }
};

export const acCalc = (payload) => {
  return {
    type: "ADD",
    payload,
  };
};
