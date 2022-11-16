import './data.js';
import './util.js';
import './previews.js';
import {PHOTO_AMOUNT, createPhotos} from './data.js';
import {createPreviews} from './previews.js';
import {showPhoto} from './photos.js';

const photos = createPhotos(PHOTO_AMOUNT);
const previews = createPreviews(photos);

showPhoto(previews, photos);

