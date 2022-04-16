export const isNotEmpty = value => {
  if (!value && !value.trim()) return false;

  if (Array.isArray(value) && value.length)
    // Remove empty values
    return value.filter(isNotEmpty).length > 0;

  if (typeof value === "object")
    // Does object have any properties ?
    return Object.keys(value).length > 0;

  return false;
};

export const classNames = (...classes) => classes.filter(Boolean).join(" ");
