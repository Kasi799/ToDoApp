import axios from "axios";
const SET_USER = "SET_USER";
const initialState = {
  user: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
export const signup = (userData) => async () => {
  try {
    console.log("Signup request:", userData);
    const response = await axios.post("/api/auth/signup", userData);
    console.log("Signup successful:", response.data);
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
  }
};

export const signin = (userData) => async (dispatch) => {
  try {
    console.log("Sign-in request:", userData);
    const response = await axios.post("/api/auth/signin", userData);
    console.log("Sign-in successful:", response.data);
    dispatch({ type: SET_USER, payload: response.data });
  } catch (error) {
    console.error("Sign-in failed:", error.response?.data || error.message);
  }
};
