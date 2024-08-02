import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
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
} from "../slice/taskSlice";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Create a new task
export const createTask = (quizData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(createTaskRequest());
    console.log(quizData);
    const { data } = await axios.post(`${backendUrl}/task/create`, quizData);
    dispatch(createTaskSuccess(data));
    toast.success("Task created successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(createTaskFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Get a task details
export const getTask = (taskId) => async (dispatch) => {
  try {
    dispatch(getTaskRequest());
    const { data } = await axios.get(`${backendUrl}/task/details/${taskId}`);
    dispatch(getTaskSuccess(data));
  } catch (error) {
    dispatch(getTaskFailure());
    toast.error(error);
  }
};

// Get user tasks
export const getTasksByUser = (dateRange) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(getTaskByUserRequest());
    const url = dateRange
      ? `${backendUrl}/task/all-tasks?filterByDateRange=${dateRange}`
      : `${backendUrl}/task/all-tasks`;

    const { data } = await axios.get(url);
    dispatch(getTaskByUserSuccess(data));
  } catch (error) {
    dispatch(getTaskByUserFailure());
    toast.error(error.response.data);
  }
};

// Edit task
export const updateTask = (taskId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(editTaskRequest());
    const { data } = await axios.put(
      `${backendUrl}/task/edit/${taskId}`,
      updatedData
    );
    dispatch(editTaskSuccess(data));
    toast.success("Task updated successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(editTaskFailure());
    toast.error(error.response.data.errorMessage, { position: "top-center" });
  }
};

// Delete task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(deleteTaskRequest());
    const { data } = await axios.delete(`${backendUrl}/task/delete/${taskId}`);
    dispatch(deleteTaskSuccess(data));
    toast.success("Task deleted successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    dispatch(deleteTaskFailure(error));
    toast.error(error.response.data.errorMessage, { position: "top-right" });
  }
};
