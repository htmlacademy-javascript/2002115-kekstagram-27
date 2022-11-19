import {toggleNumberRange} from './util.js';

const SCALE_OPTIONS = {
  min: 25,
  mах: 100,
  step: 25,
  value: 100
}

const scaleControl = document.querySelector('.scale');
const scaleButtonMinus = scaleControl.querySelector('.scale__control--smaller');
const scaleButtonPlus = scaleControl.querySelector('.scale__control--bigger');
const scaleInput = scaleControl.querySelector('.scale__control--value');

const getScaleValue = (photo) => {
  scaleInput.value = options.value + '%';
  photo.style.transform = `scale(${SCALE_OPTIONS.value / 100})`;
};

const onMinusButtonClick = (evt, options) => {
  evt.preventDefault();
  toggleNumberRange(options, '-');
  getScaleValue();
}

const onPlusButtonClick = (evt, options) => {
  evt.preventDefault();
  toggleNumberRange(options, '+');
  getScaleValue();
}

const changeScale = (options) => {
  scaleButtonMinus.addEventListener('click', (evt) => onMinusButtonClick(evt, options));
  scaleButtonPlus.addEventListener('click', (evt) => onPlusButtonClick(evt, options));
};

const renderScale = (photo) => {
  changeScale(SCALE_OPTIONS);
};

renderScale(document.querySelector('.img-upload__preview img'));
  
export {renderScale}