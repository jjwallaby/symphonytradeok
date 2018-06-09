import { fromJS } from 'immutable';

// The state of the application is contained
// within an Immutable.js Map. Each key represents
// a "slice" of state.
export default fromJS({

  // The "App" state is the generic state that's
  // always visible. This state is not specific to
  // one particular feature, in other words. It has
  // the app title, and links to various article
  // sections.
  AppStore: {
    title: 'Neckbeard News',
    GLOBALBUSDATE: "2017-10-22T02:44:46.036Z",
},

});
