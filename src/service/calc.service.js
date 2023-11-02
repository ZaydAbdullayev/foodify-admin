export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.quantity + 5000,
    0
  );
  return totalPrice;
};
