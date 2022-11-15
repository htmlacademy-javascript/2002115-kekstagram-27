const picturesContainer = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content;

const createPreviews = (photos) => {
  const previewContainer = document.createDocumentFragment();
  photos.forEach(({url, likes, comments}) => {
    const preview = previewTemplate.cloneNode(true);
    preview.querySelector('.picture__img').src = url;
    preview.querySelector('.picture__likes').textContent = likes;
    preview.querySelector('.picture__comments').textContent = comments.length;
    previewContainer.append(preview);
  });

  picturesContainer.append(previewContainer);

  return Array.from(picturesContainer.querySelectorAll('.picture'));
};

export {createPreviews};
