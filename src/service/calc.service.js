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
  data?.forEach((inner) => {
    inner[key]?.forEach((tr) => {
      total += CalculateTotalQuantity(tr?.details, "amount");
    });
  });
  return total;
};


function calculatePositionValue(positions, vw) {
  const [start, end, base] = positions;
  const minWidth = 320;
  const maxWidth = 1440;
  const minFontSize = 28;
  const maxFontSize = 40;

  const fontSize = minFontSize + ((maxFontSize - minFontSize) * (vw - minWidth)) / (maxWidth - minWidth);

  const result = fontSize + start + (end - start) * (vw - minWidth) / (maxWidth - minWidth) + base;

  return result;
}

// Kullanımı
const positions = [65, -65, 70];
const vw = window.innerWidth; // pencere genişliğini istediğiniz şekilde alabilirsiniz

const cssValue = `calc(${calculatePositionValue(positions, vw)}px)`;
console.log(cssValue); // Örnek bir çıktı: calc(35.5px)
