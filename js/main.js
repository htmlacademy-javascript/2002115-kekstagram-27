import './data.js';
import './util.js';
import './previews.js';
import './photo-modal.js';
import './form-modal.js';
import './scale.js';
import './validation.js';
import './effects.js';
import './api.js';
import {PHOTO_AMOUNT, createPhotos} from './data.js';
import {createPreviews} from './previews.js';
import {getData, sendData} from './api.js';

getData(
  (photos) => {
    createPreviews(photos);
  },
  () => {
    showAlert('Не удалось получить данные с сервера. Попробуйте обновить страницу');
  }
);
