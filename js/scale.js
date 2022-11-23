import {toggleNumberRange} from './util.js';

const SCALE_OPTIONS = {
  min: 25,
  max: 100,
  step: 25,
  value: 100
};

const scaleControl = document.querySelector('.scale');
const scaleButtonMinus = scaleControl.querySelector('.scale__control--smaller');
const scaleButtonPlus = scaleControl.querySelector('.scale__control--bigger');
const scaleInput = scaleControl.querySelector('.scale__control--value');

const setScaleValue = (photo, value) => {
  scaleInput.value = `${value}%`;
  photo.style.transform = `scale(${value / 100})`;
};

const onScaleButtonClick = (evt, options, operation, photo) => {
  evt.preventDefault();
  options.value = toggleNumberRange(options, operation);
  setScaleValue(photo, options.value);
};

const changeScale = (photo, options) => {
  const newOptions = Object.assign({}, options);

  scaleButtonMinus.addEventListener('click', (evt) => onScaleButtonClick(evt, newOptions, '-', photo));
  scaleButtonPlus.addEventListener('click', (evt) => onScaleButtonClick(evt, newOptions, '+', photo));
};

export {setScaleValue, changeScale, SCALE_OPTIONS};
