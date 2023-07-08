export const reModal = (state = false, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return true;
    case "CLOSE_MODAL":
      return false;
    default:
      return state;
  }
};

export const acOpenMadal = (payload) => ({ type: "OPEN_MODAL", payload });
export const acCloseModal = (payload) => ({ type: "CLOSE_MODAL", payload });
