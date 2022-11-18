import {openPhotoModal} from './modal.js'

const picturesContainer = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content;

const createPreviews = (photos) => {
  const previewContainer = document.createDocumentFragment();
  photos.forEach((photo) => {
    const preview = previewTemplate.cloneNode(true);
    preview.querySelector('.picture__img').src = photo.url;
    preview.querySelector('.picture__likes').textContent = photo.likes;
    preview.querySelector('.picture__comments').textContent = photo.comments.length;

    preview.querySelector('.picture').addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhotoModal(photo);
    });

    previewContainer.append(preview);
  });

  picturesContainer.append(previewContainer);
};

export {createPreviews};
