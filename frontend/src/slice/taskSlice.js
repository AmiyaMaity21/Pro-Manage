import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskLoading: false,
  tasksLoading: false,
  tasks: [],
  userTasks: null,
  task: null,
  newTask: false,
  newTaskId: null,
  isUpdatedTask: false,
  isDeletedTask: false,
};

const taskSlice = createSlice({
  initialState,
  name: "task",
  reducers: {
    createTaskRequest: (state) => {
      state.tasksLoading = true;
      state.newTask = false;
      state.newTaskId = null;
    },
    createTaskSuccess: (state, action) => {
      state.tasksLoading = false;
      state.newTask = true;
      state.newTaskId = action.payload.taskId;
    },
    createTaskFailure: (state) => {
      state.tasksLoading = false;
      state.newTask = false;
    },
    getTaskByUserRequest: (state) => {
      state.tasksLoading = true;
    },
    getTaskByUserSuccess: (state, action) => {
      state.tasksLoading = false;
      state.userTasks = action.payload.tasks;
    },
    getTaskByUserFailure: (state) => {
      state.tasksLoading = false;
    },
    getTaskRequest: (state) => {
      state.taskLoading = true;
    },
    getTaskSuccess: (state, action) => {
      state.taskLoading = false;
      state.task = action.payload.task;
    },
    getTaskFailure: (state) => {
      state.taskLoading = false;
    },
    editTaskRequest: (state) => {
      state.taskLoading = true;
      state.isUpdatedTask = false;
      state.newTaskId = null;
    },
    editTaskSuccess: (state, action) => {
      state.taskLoading = false;
      state.task = action.payload.quiz;
      state.newTaskId = action.payload.quizId;
      state.isUpdatedTask = true;
    },
    editTaskFailure: (state) => {
      state.taskLoading = false;
      state.isUpdatedTask = false;
    },
    deleteTaskRequest: (state) => {
      state.taskLoading = true;
      state.isDeletedTask = false;
    },
    deleteTaskSuccess: (state, action) => {
      state.taskLoading = false;
      state.isDeletedTask = true;
    },
    deleteTaskFailure: (state) => {
      state.taskLoading = false;
      state.isDeletedTask = false;
    },
    deleteQuizReset: (state) => {
      state.isDeletedTask = false;
    },
  },
});

export const {
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  getTaskRequest,
  getTaskSuccess,
  getTaskFailure,
  getTaskByUserRequest,
  getTaskByUserSuccess,
  getTaskByUserFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  deleteTaskReset,
} = taskSlice.actions;

export default taskSlice.reducer;
