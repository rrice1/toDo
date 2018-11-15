import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#toDo').hide();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('#navbar-button-toDo').show();
      $('#navbar-button-logout').show();
      console.log('the user', user);
    } else {
      $('#toDo').hide();
      $('#auth').show();
      $('#navbar-button-auth').show();
      $('#navbar-button-toDo').hide();
      $('#navbar-button-logout').hide();
    }
  });
};

export default { checkLoginStatus };
