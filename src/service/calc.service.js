export const CalculateTotalPrice = (cart = [], percentage = 10) => {
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1),
    0
  );
  const service = isNaN(totalPrice) ? 0 : (totalPrice / 100) * percentage;

  return {
    totalPrice,
    service: service.toFixed(2),
    total: totalPrice + service.toFixed(2),
  };
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
