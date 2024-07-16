export const uniqArray = (arr) => {
  return arr?.filter((item, index) => arr?.indexOf(item) === index) || [];
};

export const addAllIng = (c, d, set) => {
  if (c.length === d?.length) {
    set([]);
  } else {
    set(d);
  }
};
