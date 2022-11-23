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

const toggleNumberRange = ({value, step, min, max}, operation) => {
  const delta = operation === '-' ? value - step : value + step;
  return delta >= min && delta <= max ? delta : value;
};

const checkRepeats = (array) => {
  const arrayNoRepeats = new Set(array);
  return arrayNoRepeats.size === array.length;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  Object.assign(alertContainer.style, ALERT_STYLE_OPTIONS);
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInt, checkMaxLength, getRandomElement, isEscapeKey, toggleNumberRange, checkRepeats, showAlert, debounce};
