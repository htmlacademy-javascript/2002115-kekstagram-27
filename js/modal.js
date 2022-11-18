import {isEscapeKey} from './util.js';

const photoModal = document.querySelector('.big-picture');

const renderSocialCommentsList = (comments) => {
  const socialCommentsList = photoModal.querySelector('.social__comments');
  const socialCommentTemplate = photoModal.querySelector('.social__comment');
  socialCommentsList.innerHTML = '';

  comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsList.append(socialComment);
  });
};

const renderPhotoModal = ({url, likes, comments, description}) => {
  photoModal.querySelector('.big-picture__img img').src = url;
  photoModal.querySelector('.likes-count').textContent = likes;
  photoModal.querySelector('.comments-count').textContent = comments.length;
  photoModal.querySelector('.social__caption').textContent = description;
  renderSocialCommentsList(comments);
};

const closePhotoModal = () => {
  photoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPhotoModalKeyDown);
};

const onCloseButtonClick = () => {
    closePhotoModal();
};

const onPhotoModalKeyDown = (evt) => {
  if(isEscapeKey) {
    closePhotoModal();
  }
};

const openPhotoModal = (element) => {
  photoModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  photoModal.querySelector('.social__comment-count').classList.add('hidden');
  photoModal.querySelector('.comments-loader').classList.add('hidden');

  renderPhotoModal(element);

  photoModal.querySelector('.big-picture__cancel').addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onPhotoModalKeyDown);
};

export {openPhotoModal};
