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

// export function getBrowserInfo() {
//   const userAgent = navigator.userAgent;
//   let browserName = "Unknown";
//   let browserVersion = "Unknown";
//   console.log("u-u", userAgent);

//   if (userAgent.indexOf("Firefox") > -1) {
//     browserName = "Firefox";
//     browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
//   } else if (userAgent.indexOf("Chrome") > -1) {
//     browserName = "Chrome";
//     browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
//   } else if (userAgent.indexOf("Safari") > -1) {
//     browserName = "Safari";
//     browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)[1];
//   } else if (userAgent.indexOf("Edg") > -1) {
//     browserName = "Edge";
//     browserVersion = userAgent.match(/Edge\/(\d+\.\d+)/)[1];
//   } else if (userAgent.indexOf("Yandex") > -1) {
//     browserName = "Yandex";
//     browserVersion = userAgent.match(/YaBrowser\/(\d+\.\d+)/)[1];
//   }

//   return { browserName, browserVersion };
// }
