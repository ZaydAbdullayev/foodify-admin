export const reSearch = (state = "", action) => {
  switch (action.type) {
    case "SEARCH":
      return action.payload;
    default:
      return state;
  }
};
const date = new Date().toLocaleDateString("uz-UZ").split("T")[0];
export const reGetNewData = (
  state = {
    date: {
      start: date,
      end: date,
    },
  },
  action
) => {
  switch (action.type) {
    case "DATE":
      return action.payload;
    default:
      return state;
  }
};

export const acSearch = (payload) => ({ type: "SEARCH", payload });
export const acGetDate = (payload) => ({ type: "DATE", payload });
