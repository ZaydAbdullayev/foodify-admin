const user = JSON?.parse(localStorage.getItem("user"))?.user || null;

export const reActive = (
  state = {
    res_id: user?.id,
    id: "",
    name: "",
    storage: "",
    department: "",
    unit: "",
    group: "",
  },
  action
) => {
  switch (action.type) {
    case "ACTIVE_ITEM":
      return action.payload;
    default:
      return state;
  }
};

export const reActiveThing = (state = {}, action) => {
  switch (action.type) {
    case "ACTIVE_THING":
      return action.payload;
    default:
      return state;
  }
};

export const reStorageId = (state = "", action) => {
  switch (action.type) {
    case "STORAGE_ID":
      return action.payload;
    default:
      return state;
  }
};

export const acActive = (payload) => ({ type: "ACTIVE_ITEM", payload });
export const acActiveThing = (payload) => ({ type: "ACTIVE_THING", payload });
export const acStorageId = (payload) => ({ type: "STORAGE_ID", payload });
