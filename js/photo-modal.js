import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const photoModal = document.querySelector('.big-picture');
const closeModalButton = photoModal.querySelector('.big-picture__cancel');
const socialCommentsList = photoModal.querySelector('.social__comments');
const commentsLoaderButton = photoModal.querySelector('.comments-loader');
const commentsCounter = photoModal.querySelector('.social__comment-count');

const createComments = (comments) => {
  const socialCommentTemplate = photoModal.querySelector('.social__comment');
  socialCommentTemplate.classList.add('hidden');
  socialCommentsList.innerHTML = '';

  comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsList.appendChild(socialComment);
  });
};

const getHiddenComments = () => photoModal.querySelectorAll('.social__comment.hidden');

const showComment = (comments, quantity) => {
  for(let i = 0; i < quantity; i++) {
    comments[i].classList.remove('hidden');
  }
};

const countComments = (comments) => {
  const hiddenComments = getHiddenComments();
  const amount = comments.length - hiddenComments.length;
  commentsCounter.textContent = `${amount} из ${comments.length} комментариев`;
};

const addComments = (evt, comments) => {
  evt.preventDefault();
  const hiddenComments = getHiddenComments();
  const rest = hiddenComments.length - COMMENTS_STEP;
  if(rest > 0) {
    showComment(hiddenComments, COMMENTS_STEP);
  } else if (rest === 0) {
    showComment(hiddenComments, COMMENTS_STEP);
    commentsLoaderButton.classList.add('hidden');
  } else {
    showComment(hiddenComments, hiddenComments.length);
    commentsLoaderButton.classList.add('hidden');
  }

  countComments(comments);
};

const renderSocialCommentsList = (comments) => {
  createComments(comments);
  showComment(getHiddenComments(), COMMENTS_STEP);
  countComments(comments);
  commentsLoaderButton.addEventListener('click', (evt) => addComments(evt,comments));
};

const createPhotoModal = ({url, likes, comments, description}) => {
  photoModal.querySelector('.big-picture__img img').src = url;
  photoModal.querySelector('.likes-count').textContent = likes;
  photoModal.querySelector('.social__caption').textContent = description;
  renderSocialCommentsList(comments);
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
  commentsLoaderButton.removeEventListener('click', addComments);
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

  createPhotoModal(element);

  closeModalButton.addEventListener('click', onCloseButton);
  document.addEventListener('keydown', onPhotoModalKeyDown);
};

export {renderSocialCommentsList, openPhotoModal};
