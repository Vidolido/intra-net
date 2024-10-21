export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
