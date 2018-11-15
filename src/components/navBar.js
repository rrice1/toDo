import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    console.log(e.target.id);
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#auth').show();
        $('#toDo').hide();
      }).catch((err) => {
        console.error('Youre still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-toDo') {
      $('#auth').hide();
      $('#toDo').hide();
    } else {
      // click authentication
      $('#auth').show();
      $('#toDo').hide();
    }
  });
};

const createNavbar = () => {
  const domString = `
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <a class="navbar-brand" href="#">The To Do List</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a id="navbar-button-auth"class="nav-link" href="#">Authentication</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-toDo"class="nav-link" href="#">To Do</a>
      </li>
      <li class="nav-item">
        <a id="navbar-button-logout"class="nav-link" href="#">Logout</a>
      </li>
    </ul>
  </div>
</nav>
  `;

  $('#navbar').html(domString);
  navbarEvents();
};

export default { createNavbar };
