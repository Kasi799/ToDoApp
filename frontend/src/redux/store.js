import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./reduxRoutes/authRedux";
import {taskReducer} from "./reduxRoutes/taskRedux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
