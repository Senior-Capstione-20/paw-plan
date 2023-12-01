import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';

const store = configureStore({
 reducer: {
  session: sessionReducer
 }
});

// Initialize the session service
sessionService.initSessionService(store, { driver: 'COOKIES' });

export default store;