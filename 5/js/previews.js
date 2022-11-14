import {photos} from './data.js';
const picturesContainer = document.querySelector('.pictures');
const previewContainer = document.createDocumentFragment();
const previewTemplate = document.querySelector('#picture').content;

photos.forEach(({url, likes, comments}) => {
  const preview = previewTemplate.cloneNode(true);
  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__likes').textContent = likes;
  preview.querySelector('.picture__comments').textContent = comments.length;
  previewContainer.append(preview);
});

picturesContainer.append(previewContainer);
