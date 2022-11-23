import {isEscapeKey} from './util.js';
import {setScaleValue, changeScale, SCALE_OPTIONS} from './scale.js';
import {loadPictureEffectsControl, clearEffect} from './effects.js';
import {sendData} from './api.js';
import {validate} from './validation.js';
import {openMessage, checkTypeMessage} from './message.js';

const uploadControl = document.querySelector('#upload-file');
const formModal = document.querySelector('.img-upload__overlay');
const hashtagInput = formModal.querySelector('[name="hashtags"]');
const commentInput = formModal.querySelector('[name="description"]');
const uploadFrom = document.querySelector('#upload-select-image');
const closeFormButton = formModal.querySelector('#upload-cancel');
const imagePreview = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

const SUCCESS_TYPE_MESSAGE = 'success';
const ERROR_TYPE_MESSAGE = 'error';


const stopEscPropagation = (element) => {
  element.addEventListener('keydown', (evt) =>{
    if(isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
};

const clearInputs = () => {
  uploadControl.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

const closeEditFrom = () => {
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearInputs();
  removeListeners();
  setScaleValue(imagePreview, SCALE_OPTIONS.value);
  clearEffect();
};

const onCloseButtonClick = (evt) => {
  closeEditFrom(evt);
};

const onFormKeyDown = (evt) => {
  if(isEscapeKey(evt) && !checkTypeMessage()) {
    evt.preventDefault();
    closeEditFrom(evt);
  }
};

function removeListeners () {
  document.removeEventListener('keydown', onFormKeyDown);
  closeFormButton.removeEventListener('click', onCloseButtonClick);
  hashtagInput.removeEventListener('focus', stopEscPropagation(hashtagInput));
  commentInput.removeEventListener('focus', stopEscPropagation(commentInput));
}

function addListeners () {
  document.addEventListener('keydown', onFormKeyDown);
  closeFormButton.addEventListener('click', onCloseButtonClick);
  hashtagInput.addEventListener('focus', stopEscPropagation(hashtagInput));
  commentInput.addEventListener('focus', stopEscPropagation(commentInput));
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setEditFormSubmit = (onSuccess) => {
  uploadFrom.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          openMessage(SUCCESS_TYPE_MESSAGE);
        },
        () => {
          unblockSubmitButton();
          openMessage(ERROR_TYPE_MESSAGE);
        },
        new FormData(evt.target),
      );
    }
  });
};

const openEditForm = () => {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  changeScale(imagePreview, SCALE_OPTIONS);
  loadPictureEffectsControl();
  addListeners();
};

uploadControl.addEventListener('change', () => {
  openEditForm();
});

export {closeEditFrom, setEditFormSubmit};
