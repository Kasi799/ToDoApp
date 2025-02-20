import axios from "axios";

// const API_BASE_URL = "https://todoapp-emlp.onrender.com/api/tasks";

const API_BASE_URL = "http://localhost:5000/api/tasks";

const SET_TASKS = "SET_TASKS";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const ADD_SUBTASK = "ADD_SUBTASK";
const UPDATE_SUBTASK = "UPDATE_SUBTASK";

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

    case ADD_SUBTASK:
      return {
        ...state,
        list: state.list.map((task) =>
          task._id === action.payload.taskId
            ? {
                ...task,
                subtasks: [...(task.subtasks || []), action.payload.subtask],
              }
            : task
        ),
      };

    case UPDATE_SUBTASK:
      return {
        ...state,
        list: state.list.map((task) =>
          task._id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((sub) =>
                  sub._id === action.payload.subtaskId
                    ? { ...sub, ...action.payload.updates }
                    : sub
                ),
              }
            : task
        ),
      };

    default:
      return state;
  }
};

// Fetch tasks
export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    dispatch({ type: SET_TASKS, payload: response.data });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Create a task
export const createTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, task);
    dispatch({ type: ADD_TASK, payload: response.data });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// Edit a task
export const editTask = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${task._id}`, {
      title: task.title,
    });
    dispatch({ type: UPDATE_TASK, payload: response.data });
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// Remove a task
export const removeTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

// Add a subtask
export const createSubTask = (taskId, subtask) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${taskId}/subtasks`,
      subtask
    );
    dispatch({
      type: ADD_SUBTASK,
      payload: { taskId, subtask: response.data },
    });
  } catch (error) {
    console.error("Error adding subtask:", error);
  }
};

export const updateSubTask =
  (taskId, subtaskId, updates) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${taskId}/subtasks/${subtaskId}`,
        updates
      );
      dispatch({
        type: UPDATE_SUBTASK,
        payload: { taskId, subtaskId, updates: response.data }, 
      });
    } catch (error) {
      console.error(
        "Error updating subtask:",
        error.response?.data || error.message
      );
    }
  };
