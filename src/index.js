import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';


import createNavBar from './components/navBar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';

import './index.scss';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar.createNavbar();
  loginButton.loginButton();
  checkLoginStatus.checkLoginStatus();
};

initializeApp();
