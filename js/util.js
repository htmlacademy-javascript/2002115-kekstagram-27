const getRandomInt = (a, b) => {
  if (a >= 0 && b >= 0) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const result = Math.floor(Math.random() * (max - min)) + min;
    return result;
  }
  return NaN;
};

const checkMaxLength = (array, maxLength) => array.length <= maxLength;

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleNumberRange = (options, operation) => {
  const {value, step, min, mах} = options;
  const delta = operation === '-' ? value - step : value + step;
  value = delta >= min && delta <= mах ? delta : value;
  return options;
};

const checkRepeats = (array) => {
  const arrayNoRepeats = new Set(array);
  return arrayNoRepeats.size === array.length;
};

export {getRandomInt, checkMaxLength, getRandomElement, isEscapeKey, toggleNumberRange, checkRepeats};
