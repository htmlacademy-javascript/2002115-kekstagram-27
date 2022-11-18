import './data.js';
import './util.js';
import './previews.js';
import './modal.js';
import {PHOTO_AMOUNT, createPhotos} from './data.js';
import {createPreviews} from './previews.js';

const photos = createPhotos(PHOTO_AMOUNT);
createPreviews(photos);


