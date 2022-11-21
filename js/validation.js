import {checkRepeats, checkMaxLength} from './util.js';

const HASHTAG_MAX_AMOUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{0,20}$/i;
const HASHTAG_RULES = {
  hasHash: 'Хэштег должен начинаться с # и состоять из букв и чисел',
  hashtagLength: `Длина хэштега меньше ${HASHTAG_MAX_LENGTH} символов`,
  maxAmount: `Максимум ${HASHTAG_MAX_AMOUNT} хэштегов`,
  noRepeat: 'Хэштеги не могут повторяться',
};

const uploadFrom = document.querySelector('#upload-select-image');
const hashtagInput = uploadFrom.querySelector('[name="hashtags"]');

const pristine = new Pristine (uploadFrom, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

const validateHashtagSymbols = () => {
  if (hashtagInput.value !== '') {
    return hashtagInput.value.split(' ').every((hashtag) => HASHTAG_REGEX.test(hashtag));
  }
};
const validateHashtagMaxLength = () => hashtagInput.value.split(' ').every((hashtag) => checkMaxLength(hashtag, HASHTAG_MAX_LENGTH));
const validateHashtagsQuantity = () => checkMaxLength(hashtagInput.value.split(' '), HASHTAG_MAX_AMOUNT);
const validateHashtagValuesRepeat = () => checkRepeats(hashtagInput.value.split(' '));

pristine.addValidator(hashtagInput, validateHashtagSymbols, HASHTAG_RULES.hasHash);
pristine.addValidator(hashtagInput, validateHashtagMaxLength, HASHTAG_RULES.hashtagLength);
pristine.addValidator(hashtagInput, validateHashtagsQuantity, HASHTAG_RULES.maxAmount);
pristine.addValidator(hashtagInput, validateHashtagValuesRepeat, HASHTAG_RULES.noRepeat);

const validate = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export {validate};

