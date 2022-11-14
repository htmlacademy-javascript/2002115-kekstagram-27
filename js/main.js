import './data.js';
import './util.js';
import './previews.js';
import {createPhotos} from './data.js';
import {createPreviews} from './previews.js';

createPreviews(createPhotos());
