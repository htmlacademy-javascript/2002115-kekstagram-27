import {isEscapeKey} from './util.js';
import {changeScale, SCALE_OPTIONS} from './scale.js';

//Подготовка
const uploadControl = document.querySelector('#upload-file');
const formModal = document.querySelector('.img-upload__overlay');
const closeFormButton = formModal.querySelector('#upload-cancel');

//Отрисовать форму редактирования изображения
// Зарытие модального окна
const closeEditFrom = (evt) => {
  evt.preventDefault();
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadControl.value = '';
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onFormKeyDown);
  // eslint-disable-next-line no-use-before-define
  closeFormButton.removeEventListener('click', onCloseButtonClick);
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
  changeScale(SCALE_OPTIONS);

  document.addEventListener('keydown', onFormKeyDown);
  closeFormButton.addEventListener('click', onCloseButtonClick);
};

//Загрузить форму редактирования после выбора изображения
uploadControl.addEventListener('change', () => {
  openEditForm();
});