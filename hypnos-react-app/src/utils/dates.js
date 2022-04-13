import i18next from "i18next";

export const today = new Date();

export const isMonday = (date = today) => date.getDay() === 1;

export const isSunday = (date = today) => date.getDay() === 0;

export const isSaturday = (date = today) => date.getDay() === 6;

export const monthName = (date, i18n) => {
  const month = date.getMonth();
  if (i18n) {
    return i18next.t(`date.months.${month}`);
  }
  return `${month + 1}`;
};

export const firstDayOfMonth = (date = today) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const lastDayOfMonth = (date = today) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const isBefore = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getTime() < d2.getTime();
};

export const isAfter = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return d1.getTime() > d2.getTime();
};

export const areSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return toDateString(d1) === toDateString(d2);
};

export const firstDayOfWeek = (date = today) => {
  const firstDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay()
  );
  return firstDay;
};

export const lastDayOfWeek = (date = today) => {
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + (6 - date.getDay())
  );
  return lastDay;
};

export const monthFromSundayToSaturday = (date = today) => {
  let start = firstDayOfMonth(date);
  let end = lastDayOfMonth(date);

  if (!isSunday(start)) start = firstDayOfWeek(start);
  if (!isSaturday(end)) end = lastDayOfWeek(end);

  return { start, end };
};

export const monthDates = (date = today) => {
  const { start, end } = monthFromSundayToSaturday(date);
  const days = [];
  let current = start;

  while (current <= end) {
    days.push(current);
    current = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate() + 1
    );
  }

  return days;
};

const addLeadingZero = number => {
  return number < 10 ? `0${number}` : number;
};

const toDateString = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};

export const toFriendlyString = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${addLeadingZero(day)}.${addLeadingZero(month)}.${year}`;
};

export const generateCalendar = (date = today) =>
  monthDates(date).map(day => {
    return {
      day,
      date: toDateString(day),
      isToday: day.toDateString() === today.toDateString(),
      isCurrentMonth: day.getMonth() === date.getMonth()
    };
  });
