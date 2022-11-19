const getRandomInt = (a, b) => {
  if (a >= 0 && b >= 0) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    const result = Math.floor(Math.random() * (max - min)) + min;
    return result;
  }
  return NaN;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleNumberRange = (options, operation) => {
  let delta = operation === '-' ? options.value - options.step : options.value + options.step;
  options.value = delta >= options.min && delta <= options.mах ? delta : options.value;
  return options;
};

export {getRandomInt, checkStringLength, getRandomElement, isEscapeKey, toggleNumberRange};
