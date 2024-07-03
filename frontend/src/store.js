import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import taskSlice from "./slice/taskSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
  },
});
export default store;
