import {toggleNumberRange} from './util.js';

const SCALE_OPTIONS = {
  min: 25,
  mах: 100,
  step: 25,
  value: 100
};

const scaleControl = document.querySelector('.scale');
const scaleButtonMinus = scaleControl.querySelector('.scale__control--smaller');
const scaleButtonPlus = scaleControl.querySelector('.scale__control--bigger');
const scaleInput = scaleControl.querySelector('.scale__control--value');

const getScaleValue = (photo, options) => {
  scaleInput.value = `${options.value}%`;
  photo.style.transform = `scale(${options.value / 100})`;
};

const onScaleButtonClick = (evt, options, operation, photo) => {
  evt.preventDefault();
  toggleNumberRange(options, operation);
  getScaleValue(photo, options);
};

const changeScale = (photo, options) => {
  scaleButtonMinus.addEventListener('click', (evt) => onScaleButtonClick(evt, options, '-', photo));
  scaleButtonPlus.addEventListener('click', (evt) => onScaleButtonClick(evt, options, '+', photo));
};


changeScale(document.querySelector('.img-upload__preview img'), SCALE_OPTIONS);

export {changeScale, SCALE_OPTIONS};
