import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTasks = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const taskObject = results.data;
      const taskArray = [];
      if (taskObject != null) {
        Object.keys(taskObject).forEach((taskId) => {
          taskObject[taskId].id = taskId;
          taskArray.push(taskObject[taskId]);
        });
      }
      resolve(taskArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleTask = taskId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tasks/${taskId}.json`)
    .then((result) => {
      const singleTask = result.data;
      singleTask.id = taskId;
      resolve(singleTask);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteTask = taskId => axios.delete(`${firebaseUrl}/tasks/${taskId}.json`);

const addNewTask = taskObject => axios.post(`${firebaseUrl}/tasks.json`, JSON.stringify(taskObject));


export default {
  getAllTasks,
  getSingleTask,
  deleteTask,
  addNewTask,
};
