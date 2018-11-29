import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';

const printSingleTask = (task) => {
  const taskString = `
  <div>
    <h1>${task.task}</h1>
    <div class="form-check form-check-inline">
    <label class="form-check-label" for="inlineCheckbox1">Have I Completed This?</label>
  <input class="form-check-input is-completed-checkbox" type="checkbox" id="${task.id}" value="option1">
</div>
    <button class="btn btn-danger delete-btn" data-delete-id=${task.id}>X</button>
    <button class="btn btn-info edit-btn" data-edit-id=${task.id}>Edit</button>
    </div>
  `;
  $('#single-container').html(taskString);
  if (task.isCompleted) {
    $('.is-completed-checkbox').attr('checked', true);
  }
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
      console.error('error in getting tasks', error);
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

const updateIsCompleted = (e) => {
  const taskId = e.target.id;
  const isCompleted = e.target.checked;
  taskData.updateIsCompleted(taskId, isCompleted)
    .then(() => {

    })
    .catch((err) => {
      console.error('error in updating flag', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.get-single', getSingleTask);
  $('body').on('click', '.delete-btn', deleteTask);
  $('body').on('change', '.is-completed-checkbox', updateIsCompleted);
};

const initializeTaskPage = () => {
  taskPage();
  bindEvents();
};

export default initializeTaskPage;
