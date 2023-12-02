export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.quantity + 5000,
    0
  );
  return totalPrice;
};

export const CalculateTotalQuantity = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + parseInt(item?.amount, 10),
    0
  );
  return totalPrice;
};

export const CalculateTotalP = (cart, first, second) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item[first] * item[second],
    0
  );
  return totalPrice;
};
