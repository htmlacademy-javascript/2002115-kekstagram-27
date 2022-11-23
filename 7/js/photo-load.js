const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadControl = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');

uploadControl.addEventListener('change', () => {
  const file = uploadControl.files[0];
  const fileName = file.name.toLowerCase();
  const fileFormat = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (fileFormat) {
    imagePreview.src = URL.createObjectURL(file);
  }
});
