import {renderScale} from './scale.js';
//Подготовка
const uploadControl = document.querySelector('#upload-file');
const editForm = document.querySelector('.img-upload__overlay');
const uploadPreview = editForm.querySelector('.img-upload__preview img');
const uploadButton = editForm.querySelector('#upload-submit');

//Отрисовать форму редактирования изображения
const openEditForm = () => {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // renderScale(uploadPreview);
  
};

const closeEditFrom = () => {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

//Загрузить форму редактирования после выбора изображения
uploadControl.addEventListener('change', () => {
  openEditForm();
});

uploadButton.addEventListener('click', () => {
  closeEditForm();
});



