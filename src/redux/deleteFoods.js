const initialState = {
  products: [],
  income: [],
  expense: [],
  edr: [],
  cutting: [],
  damaged: [],
  curryUp: [],
  making: [],
  preOrder: [],
  main: [],
  dep: [],
  category: [],
  group: [],
  ing: [],
  newIngGr: [],
  supp: [],
  invGr: [],
  cashbox: [],
  cashboxGr: [],
  trsn: [],
  table: [],
};

export const rootDocuments = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOCUMENTS":
      const existingDocuments = state[action.payload.roomId];
      const newDocument = action.payload.document;

      if (existingDocuments.includes(newDocument)) {
        const filteredDocuments = existingDocuments.filter(
          (doc) => doc !== newDocument
        );

        return {
          ...state,
          [action.payload.roomId]: filteredDocuments,
        };
      }

      return {
        ...state,
        [action.payload.roomId]: [...existingDocuments, newDocument],
      };
    case "SET_RELEASE":
      return {
        ...state,
        [action.payload.roomId]: [],
      };

    default:
      return state;
  }
};

export const setDocuments = (roomId, document) => ({
  type: "SET_DOCUMENTS",
  payload: {
    roomId,
    document,
  },
});

export const setRelease = (roomId) => ({
  type: "SET_RELEASE",
  payload: {
    roomId,
  },
});
