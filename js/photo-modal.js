import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const photoModal = document.querySelector('.big-picture');
const closeModalButton = photoModal.querySelector('.big-picture__cancel');
const socialCommentsList = photoModal.querySelector('.social__comments');
const commentsLoaderButton = photoModal.querySelector('.comments-loader');
const socialCommentTemplate = photoModal.querySelector('.social__comment');
const commentsCounter = photoModal.querySelector('.social__comment-count');

const createComment = ({avatar, message, name}) => {
  const socialComment = socialCommentTemplate.cloneNode(true);
  socialComment.querySelector('.social__picture').src = avatar;
  socialComment.querySelector('.social__picture').alt = name;
  socialComment.querySelector('.social__text').textContent = message;

  return socialComment;
};

const renderCommentsList = (comments) => {
  socialCommentsList.append(...comments.map(createComment));
};

const checkCommentsRest = (comments) => {
  if (comments.length <= COMMENTS_STEP) {
    renderCommentsList(comments);
    commentsLoaderButton.classList.add('hidden');
    return [];
  }

  commentsLoaderButton.classList.remove('hidden');
  renderCommentsList(comments.slice(0, COMMENTS_STEP));
  return comments.slice(COMMENTS_STEP);
};

const countComments = (tagName, element) => {
  const currentAmount = photoModal.querySelectorAll(tagName).length;
  const totalAmount = element.comments.length;
  commentsCounter.textContent = `${currentAmount} из ${totalAmount} комментариев`;
};

const createPhotoModal = ({url, likes, description}) => {
  photoModal.querySelector('.big-picture__img img').src = url;
  photoModal.querySelector('.likes-count').textContent = likes;
  photoModal.querySelector('.social__caption').textContent = description;
};

const closePhotoModal = (evt) => {
  evt.preventDefault();
  photoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onPhotoModalKeyDown);
  // eslint-disable-next-line no-use-before-define
  closeModalButton.removeEventListener('click', onCloseButton);
  commentsLoaderButton.classList.remove('hidden');
};

const onCloseButton = (evt) => {
  closePhotoModal(evt);
};

const onPhotoModalKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closePhotoModal(evt);
  }
};

const openPhotoModal = (element) => {
  photoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  let commentsRest = [];
  socialCommentsList.innerHTML = '';

  createPhotoModal(element);
  commentsRest = checkCommentsRest(element.comments);
  countComments('li', element);

  commentsLoaderButton.addEventListener('click', () => {
    commentsRest = checkCommentsRest(commentsRest);
    countComments('li', element);
  });

  closeModalButton.addEventListener('click', onCloseButton);
  document.addEventListener('keydown', onPhotoModalKeyDown);
};

export {openPhotoModal};
