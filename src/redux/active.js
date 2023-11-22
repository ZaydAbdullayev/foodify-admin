const user = JSON?.parse(localStorage.getItem("user"))?.user || null;

export const reActive = (
  state = { res_id: user?.id, id: null, name: "", storage: "", department: "" },
  action
) => {
  switch (action.type) {
    case "ACTIVE_ITEM":
      return action.payload;
    default:
      return state;
  }
};

export const acActive = (payload) => ({ type: "ACTIVE_ITEM", payload });
