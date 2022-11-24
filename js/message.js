import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const checkTypeMessage = () => document.querySelector('.success, .error');

const closeMessage = () => {
  document.removeEventListener('keydown', onMessageEscapeKeydown);
  document.removeEventListener('click', onMessageOutsideClick);
  const messageElement = checkTypeMessage();
  if (messageElement) {
    messageElement.remove();
  }
};

function onMessageEscapeKeydown (evt) {
  if (isEscapeKey(evt) && checkTypeMessage()) {
    evt.preventDefault();
    closeMessage();
  }
}

function onMessageOutsideClick (evt) {
  const messageElement = checkTypeMessage();

  if (messageElement && messageElement.contains(evt.target)) {
    closeMessage();
  }
}

const openMessage = (typeMessage) => {
  const message = typeMessage === 'success' ? successMessageTemplate.cloneNode(true) : errorMessageTemplate.cloneNode(true);
  const messageButton = message.querySelector(`.${typeMessage}__button`);
  document.body.append(message);

  messageButton.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onMessageEscapeKeydown);
  document.addEventListener('click', onMessageOutsideClick);
};

export {checkTypeMessage, openMessage};
