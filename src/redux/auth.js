const token = localStorage.getItem("token") || null;

export const reAuth = (state = token, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};

export const acLogin = () => ({ type: "LOGIN" });
export const acLogout = () => ({ type: "LOGOUT" });
