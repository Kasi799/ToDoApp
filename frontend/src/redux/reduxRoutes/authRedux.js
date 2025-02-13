import axios from "axios";

const API_BASE_URL = "https://todoapp-emlp.onrender.com/api/auth"; 
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const initialState = {
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const signup = (userData) => async () => {
  try {
    console.log("Signup request:", userData);
    const response = await axios.post(`${API_BASE_URL}/signup`, userData); // ✅ Fixed syntax
    console.log("Signup successful:", response.data);
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
  }
};

export const signin = (userData) => async (dispatch) => {
  try {
    console.log("Sign-in request:", userData);
    const response = await axios.post(`${API_BASE_URL}/signin`, userData); 
    console.log("Sign-in successful:", response.data);
    dispatch({ type: SET_USER, payload: response.data }); 
  } catch (error) {
    console.error("Sign-in failed:", error.response?.data || error.message);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
