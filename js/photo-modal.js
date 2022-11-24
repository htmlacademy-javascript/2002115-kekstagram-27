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

const countComments = (currentAmount, totalAmount) => {
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
  commentsLoaderButton.classList.remove('hidden');
  removeListeners();
};

const onCloseButtonClick = (evt) => {
  closePhotoModal(evt);
};

const onPhotoModalKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closePhotoModal(evt);
  }
};

function removeListeners () {
  closeModalButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onPhotoModalKeyDown);
}

const addListeners = () => {
  closeModalButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onPhotoModalKeyDown);
};

const openPhotoModal = (element) => {

  let commentsRest = [];
  const totalAmount = element.comments.length;
  socialCommentsList.innerHTML = '';

  createPhotoModal(element);
  commentsRest = checkCommentsRest(element.comments);
  countComments(totalAmount - commentsRest.length, totalAmount);

  commentsLoaderButton.addEventListener('click', () => {
    commentsRest = checkCommentsRest(commentsRest);
    countComments(totalAmount - commentsRest.length, totalAmount);
  });

  addListeners();

  photoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

export {openPhotoModal};
