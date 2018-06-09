import { fromJS } from 'immutable';
import initialState from './initialState';

// The initial page heading.
const title = "Neckbeard News";
const orgDate = "2017-10-22T02:44:46.036Z";

// Maps the action type to a function
// that returns new state.
const typeMap = fromJS({
  // The article is being fetched, adjust
  // the "title" and "links" state.
  FETCHING_GLOBAL: state =>
    state
      .set('title', '...')
      .set('GLOBALBUSDATE', '...'),



  // The list of articles are being fetched. Set
  // the "title" and the "links".
  FETCHING_GLOBALS: state =>
    state
      .set('title', title)
      .set('GLOBALBUSDATE', orgDate),

  // The articles have been fetched, update the
  // "title" state.
  FETCH_GLOBALS: state =>
    state
    .set('title', title)
    .set('GLOBALBUSDATE', orgDate),

});

// This reducer relies on the "typeMap" and the
// "type" of action that was dispatched. If it's
// not found, then the state is simply returned.
export default (state, { type, payload }) =>
  typeMap.get(type, () => state)(state, payload);
