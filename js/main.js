import './util.js';
import './previews.js';
import './photo-modal.js';
import './form-modal.js';
import './scale.js';
import './validation.js';
import './effects.js';
import './api.js';
import './photo-load.js';
import {renderPreviews} from './previews.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {closeEditForm, setEditFormSubmit} from './form-modal.js';
import {showFilter, changeFilter} from './filter.js';

const RENDER_DELAY = 500;

getData(
  (photos) => {
    renderPreviews(photos);
    showFilter();
    changeFilter(debounce(
      () => renderPreviews(photos),
      RENDER_DELAY,
    ));
  }, showAlert);

setEditFormSubmit(closeEditForm);
