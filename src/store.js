import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

if (localStorage.getItem('CH_CLIENT_MANAGER_SETTINGS') == null) {
  const setInitialState = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  localStorage.setItem(
    'CH_CLIENT_MANAGER_SETTINGS',
    JSON.stringify(setInitialState)
  );
}

const initialState = {
  settings: JSON.parse(localStorage.getItem('CH_CLIENT_MANAGER_SETTINGS'))
};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    // reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
