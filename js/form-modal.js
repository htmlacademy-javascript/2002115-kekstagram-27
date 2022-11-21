import {isEscapeKey} from './util.js';
import {getScaleValue, changeScale, SCALE_OPTIONS} from './scale.js';
import {validate} from './validation.js';

//Подготовка
const uploadControl = document.querySelector('#upload-file');
const formModal = document.querySelector('.img-upload__overlay');
const uploadFrom = document.querySelector('#upload-select-image');
const hashtagInput = formModal.querySelector('[name="hashtags"]');
const commentInput = formModal.querySelector('[name="description"]');
const closeFormButton = formModal.querySelector('#upload-cancel');
const imagePreview = document.querySelector('.img-upload__preview img');

//Отрисовать форму редактирования изображения
// Зарытие модального окна
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
};

const onCloseButtonClick = (evt) => {
  closeEditFrom(evt);
};

const onFormKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closeEditFrom(evt);
  }
};

// Открытие модального окна
const openEditForm = () => {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  changeScale(imagePreview, Object.assign({}, SCALE_OPTIONS));

  document.addEventListener('keydown', onFormKeyDown);
  closeFormButton.addEventListener('click', onCloseButtonClick);
  uploadFrom.addEventListener('submit', validate);
  hashtagInput.addEventListener('focus', stopEscPropagation(hashtagInput));
  commentInput.addEventListener('focus', stopEscPropagation(commentInput));
};

//Загрузить форму редактирования после выбора изображения
uploadControl.addEventListener('change', () => {
  openEditForm();
});
