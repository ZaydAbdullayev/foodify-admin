export const reUModal = (state = false, action) => {
  switch (action.type) {
    case "OPEN_UMODAL":
      return true;
    case "CLOSE_UMODAL":
      return false;
    default:
      return state;
  }
};

export const reUModalU = (state = false, action) => {
  switch (action.type) {
    case "OPEN_UMODAL_U":
      return true;
    case "CLOSE_UMODAL_U":
      return false;
    default:
      return state;
  }
};

export const acOpenUModal = (payload) => ({ type: "OPEN_UMODAL", payload });
export const acCloseUModal = (payload) => ({ type: "CLOSE_UMODAL", payload });
export const acOpenUModalU = (payload) => ({ type: "OPEN_UMODAL_U", payload });
export const acCloseUModalU = (payload) => ({
  type: "CLOSE_UMODAL_U",
  payload,
});
