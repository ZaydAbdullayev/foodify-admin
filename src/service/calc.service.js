export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.quantity + 5000,
    0
  );
  return totalPrice;
};

export const CalculateTotalQuantity = (cart, key) => {
  const totalPrice =
    cart?.reduce(
      (accumulator, item) => accumulator + parseInt(item[key], 10),
      0
    ) || 0;
  return totalPrice;
};

export const CalculateTotalP = (cart, first, second) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item[first] * item[second],
    0
  );
  return totalPrice;
};

export const CalculateTotalByLine = (cart, keyToExclude) => {
  const totalPrice =
    cart?.reduce((accumulator, item) => {
      // Anahtar hariç tüm öğeleri topla
      if (!item.hasOwnProperty(keyToExclude)) {
        accumulator += parseInt(item[keyToExclude], 10) || 0;
      }
      return accumulator;
    }, 0) || 0;

  return totalPrice;
};

export const CalculateTotal = (data, key) => {
  let total = 0;
  data.forEach((inner) => {
    inner[key]?.forEach((tr) => {
      total += CalculateTotalQuantity(tr?.details, "price");
    });
  });
  return total;
};
