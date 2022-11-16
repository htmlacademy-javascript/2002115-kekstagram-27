const photoModal = document.querySelector('.big-picture');

const getSocialCommentsList = (comments) => {
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

const showPhoto = (previews, photos) => {
  previews.forEach((preview) => {
    preview.addEventListener('click', (evt) => {
      evt.preventDefault();
      photoModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
      photoModal.querySelector('.social__comment-count').classList.add('hidden');
      photoModal.querySelector('.comments-loader').classList.add('hidden');

      const currentPhoto = photos[previews.indexOf(preview)];
      photoModal.querySelector('.big-picture__img img').src = currentPhoto.url;
      photoModal.querySelector('.likes-count').textContent = currentPhoto.likes;
      photoModal.querySelector('.comments-count').textContent = currentPhoto.comments.length;
      photoModal.querySelector('.social__caption').textContent = currentPhoto.description;
      getSocialCommentsList(currentPhoto.comments);
    });
  });

  photoModal.querySelector('.big-picture__cancel').addEventListener('click', () => {
    photoModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if(evt.code === 'Escape') {
      photoModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};


export {showPhoto};
