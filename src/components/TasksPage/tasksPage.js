import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

const printSingleTask = (task) => {
  const taskString = `
  <div>
    <h1>${task.task}</h1>
    <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>X</button>
    </div>
  `;
  $('#single-container').html(taskString);
};

const getSingleTask = (e) => {
  // firebase id
  const taskId = e.target.dataset.dropdownId;
  const uid = authHelpers.getCurrentUid();
  taskData.getSingleTask(taskId)
    .then((singleTask) => {
      console.log('uid', uid);
      printSingleTask(singleTask);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const buildDropdown = (taskArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Task
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (taskArray.length) {
    taskArray.forEach((task) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${task.id}>${task.task}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">You have no tasks.</div>';
  }
  dropdown += '</div></div>';
  $('#dropdown-container').html(dropdown);
};

const taskPage = () => {
  const uid = authHelpers.getCurrentUid();
  taskData.getAllTasks(uid)
    .then((taskArray) => {
      buildDropdown(taskArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  taskData.deleteTask(idToDelete)
    .then(() => {
      taskPage();
      $('#single-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};


const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
};

const initializeTaskPage = () => {
  taskPage();
  bindEvents();
};

export default initializeTaskPage;
