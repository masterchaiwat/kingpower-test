import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
//import store from './redux/store'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import applicantReducer from './reducers/applicantReducer';
import  {loadApplicant} from './actions/applicantAction';

import 'bootstrap/dist/css/bootstrap.min.css';

//const reducers = combineReducers({applicant: applicantReducer});
const store = createStore(applicantReducer, applyMiddleware(thunk));
store.dispatch(loadApplicant());


const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
