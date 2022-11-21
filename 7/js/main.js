import './data.js';
import './util.js';
import './previews.js';
import './photo-modal.js';
import './form-modal.js';
import './scale.js';
import './validation.js';
import {PHOTO_AMOUNT, createPhotos} from './data.js';
import {createPreviews} from './previews.js';

const photos = createPhotos(PHOTO_AMOUNT);
createPreviews(photos);


