const ALERT_SHOW_TIME = 8000;

const ALERT_STYLE_OPTIONS = {
  zIndex : '100',
  position : 'absolute',
  left : '0',
  top : '0',
  right : '0',
  padding : '10px 3px',
  fontSize : '30px',
  lineHeight : '36px',
  textAlign : 'center',
  backgroundColor : '#232321',
  border : '3px solid red'
};

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
  options.value = delta >= min && delta <= mах ? delta : value;
  return options;
};

const checkRepeats = (array) => {
  const arrayNoRepeats = new Set(array);
  return arrayNoRepeats.size === array.length;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  for (let option in ALERT_STYLE_OPTIONS) {
    alertContainer.style.option = Object.ValueOf(option);
  }

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInt, checkMaxLength, getRandomElement, isEscapeKey, toggleNumberRange, checkRepeats};
