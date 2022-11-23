import {openPhotoModal} from './photo-modal.js';

const RANDOM_PHOTOS_AMOUNT = 10;

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filter = document.querySelector('.img-filters');
let activeFilterButton = filter.querySelector('.img-filters__button--active').id;

const sortByMostDiscussied = (photos) => photos.sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);

const filterRandom = (photos) => photos.sort(() => Math.random() - Math.random()).slice(0, RANDOM_PHOTOS_AMOUNT);

const createPreview = ({url, likes, comments, description}) => {
  const preview = pictureTemplate.cloneNode(true);
  const info = {url, likes, comments, description};

  preview.querySelector('.picture__img').src = url;
  preview.querySelector('.picture__likes').textContent = likes;
  preview.querySelector('.picture__comments').textContent = comments.length;
  preview.addEventListener('click', () => {
    openPhotoModal(info);
  });
  return preview;
};

const renderPreviews = (photos) => {
  activeFilterButton = filter.querySelector('.img-filters__button--active').id;
  const allPhotos = pictures.querySelectorAll('.picture');
  let newPhotos = photos.slice();

  if (activeFilterButton === 'filter-random') {
    newPhotos = filterRandom(newPhotos);
  } else if (activeFilterButton === 'filter-discussed') {
    newPhotos = sortByMostDiscussied(newPhotos);
  }

  allPhotos.forEach((element) => element.remove());

  pictures.append(...newPhotos.map(createPreview));
};

export {renderPreviews};
