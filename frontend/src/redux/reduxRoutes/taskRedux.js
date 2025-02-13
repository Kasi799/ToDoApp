import axios from "axios";

const API_BASE_URL = "https://todoapp-emlp.onrender.com/api/tasks"; 
const SET_TASKS = "SET_TASKS";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";

const initialState = {
  list: [],
};
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, list: action.payload };
    case ADD_TASK:
      return { ...state, list: [...state.list, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        list: state.list.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        list: state.list.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    dispatch({ type: SET_TASKS, payload: response.data });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, task);
    dispatch({ type: ADD_TASK, payload: response.data });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const editTask = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${task._id}`, { title: task.title });
    dispatch({ type: UPDATE_TASK, payload: response.data });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const removeTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};