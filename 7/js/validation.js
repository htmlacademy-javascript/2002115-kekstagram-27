import {checkRepeats} from './util.js';

const HASHTAG_MAX_AMOUNT = 5;
const HASHTAG_RULES = '- должен начинаться с символа # (решётка);<br>- может состоять из букв и чисел;<br>- не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;<br> - не может состоять только из одной решётки;<br>- максимальная длина одного хэш-тега 20 символов, включая решётку;<br>- нельзя указать больше 5 хэш-тегов;<br>- хэш-теги должны разделяться пробелами;<br>';
const uploadFrom = document.querySelector('#upload-select-image');
const hashtagInput = uploadFrom.querySelector('[name="hashtags"]');

const pristine = new Pristine (uploadFrom, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

const createHashtagArray = (value) => value.trim().split(' ');

const testRegExp = (hashtagsArray) => {
  const regexp = /^#[a-zа-яё0-9]{1,20}$/i;
  return hashtagsArray.every((hashtag) => regexp.test(hashtag));
};

const validateHashtags = (value) => {
  const hashtagsArray = createHashtagArray(value);
  const isLong = hashtagsArray.length <= HASHTAG_MAX_AMOUNT;
  const isRepeat = checkRepeats(hashtagsArray);
  const isHashtagsValid = testRegExp(hashtagsArray);

  return isLong && isRepeat && isHashtagsValid;
};

pristine.addValidator(hashtagInput, validateHashtags, HASHTAG_RULES);

const validate = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export {validate};

