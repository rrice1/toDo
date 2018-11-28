import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import taskData from '../../helpers/data/taskData';
import initializeTaskPage from '../TasksPage/tasksPage';

const formBuilder = (task) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Name:</label>
    <input type="text" class="form-control" value="${task.task}" id="form-task-task" placeholder="Clean up">
  </div>
  `;
  return form;
};

const gettingTaskFromForm = () => {
  const task = {
    isCompleted: false,
    task: $('#form-task-task').val(),
    uid: authHelpers.getCurrentUid(),

  };
  return task;
};

const buildAddForm = () => {
  const emptyTask = {
    task: '',
  };

  let domString = '<h2>Add New Task</h2>';
  domString += formBuilder(emptyTask);
  domString += '<button id="add-task">Add Task</button>';
  $('#add-edit-task').html(domString).show();
  $('#tasks').hide();
};

const addNewTask = () => {
  const newFriend = gettingTaskFromForm();
  taskData.addNewTask(newTask)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#task').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  taskData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<h2>Edit Task</h2>';
      domString += formBuilder(singleTask);
      domString += `<button id="edit-task" data-single-edit-id=${singleTask.id}>Save Task</button>`;
      $('#add-edit-task').html(domString).show();
      $('#tasks').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateTask = (e) => {
  const updatedFriend = gettingTaskFromForm();
  const taskId = e.target.dataset.singleEditId;
  taskData.updateTask(updatedTask, taskId)
    .then(() => {
      $('#add-edit-task').html('').hide();
      $('#single-container').html('');
      $('#tasks').show();
      initializeTasksPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-task', addNewTask);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-task', updateTask);

export default { buildAddForm };
