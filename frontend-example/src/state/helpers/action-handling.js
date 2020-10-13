// eslint-disable-next-line import/prefer-default-export
export const handleActionError = (func) => (...args) => {
  try {
    const result = func(...args);
    if (result instanceof Promise) {
      return result.catch((error) => error);
    }

    return result;
  } catch (error) {
    return error;
  }
};
