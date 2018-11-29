import firebase from 'firebase/app';
import 'bootstrap';
import $ from 'jquery';

import apiKeys from '../db/apiKeys.json';


import createNavBar from './components/navBar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import initializeTaskPage from './components/TasksPage/tasksPage';
import showAddForm from './components/AddEditTasks/addEditTasks';

import './index.scss';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  createNavBar.createNavbar();
  loginButton.loginButton();
  checkLoginStatus.checkLoginStatus(initializeTaskPage);
  $('#show-task-form').on('click', showAddForm.buildAddForm);
};

initializeApp();
