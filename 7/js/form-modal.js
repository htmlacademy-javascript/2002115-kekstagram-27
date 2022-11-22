import {isEscapeKey} from './util.js';
import {getScaleValue, changeScale, SCALE_OPTIONS} from './scale.js';
import {loadPictureEffectsControl, cleanEffect} from './effects.js';
import {validate} from './validation.js';

const uploadControl = document.querySelector('#upload-file');
const formModal = document.querySelector('.img-upload__overlay');
const uploadFrom = document.querySelector('#upload-select-image');
const hashtagInput = formModal.querySelector('[name="hashtags"]');
const commentInput = formModal.querySelector('[name="description"]');
const closeFormButton = formModal.querySelector('#upload-cancel');
const imagePreview = document.querySelector('.img-upload__preview img');

const stopEscPropagation = (element) => {
  element.addEventListener('keydown', (evt) =>{
    if(isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
};

const closeEditFrom = (evt) => {
  evt.preventDefault();
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadControl.value = '';
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onFormKeyDown);
  // eslint-disable-next-line no-use-before-define
  closeFormButton.removeEventListener('click', onCloseButtonClick);
  formModal.removeEventListener('submit', validate);
  hashtagInput.removeEventListener('focus', stopEscPropagation(hashtagInput));
  commentInput.removeEventListener('focus', stopEscPropagation(commentInput));
  getScaleValue(imagePreview, SCALE_OPTIONS);
  cleanEffect();
};

const onCloseButtonClick = (evt) => {
  closeEditFrom(evt);
};

const onFormKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closeEditFrom(evt);
  }
};

const openEditForm = () => {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  changeScale(imagePreview, Object.assign({}, SCALE_OPTIONS));
  loadPictureEffectsControl();

  document.addEventListener('keydown', onFormKeyDown);
  closeFormButton.addEventListener('click', onCloseButtonClick);
  uploadFrom.addEventListener('submit', validate);
  hashtagInput.addEventListener('focus', stopEscPropagation(hashtagInput));
  commentInput.addEventListener('focus', stopEscPropagation(commentInput));
};

uploadControl.addEventListener('change', () => {
  openEditForm();
});
