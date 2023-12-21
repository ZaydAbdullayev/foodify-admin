export const getFormattedDate = (offset) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - offset);
  return currentDate.toISOString().split("T")[0];
};

export const calculateWeekRange = (offset) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset
  );
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return {
    start: startOfWeek.toISOString().split("T")[0],
    end: endOfWeek.toISOString().split("T")[0],
  };
};

export const calculateMonthRange = (offset) => {
  const today = new Date();
  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + offset,
    1
  );
  const lastDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + offset + 1,
    0
  );
  return {
    start: firstDayOfMonth.toISOString().split("T")[0],
    end: lastDayOfMonth.toISOString().split("T")[0],
  };
};

