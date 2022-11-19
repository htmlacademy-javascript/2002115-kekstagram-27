import './data.js';
import './util.js';
import './previews.js';
import './modal.js';
import './forms.js';
import './scale.js';
import {PHOTO_AMOUNT, createPhotos} from './data.js';
import {createPreviews} from './previews.js';

const photos = createPhotos(PHOTO_AMOUNT);
createPreviews(photos);


