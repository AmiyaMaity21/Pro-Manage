import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  userId: null,
  addedUser: "",
  registerErrors: {},
  loginErrors: {},
  editErrors: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.loginErrors = {};
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.registerErrors = {};
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.registerErrors = action.payload.errorMessage;
    },

    clearRegisterError: (state, action) => {
      const fieldName = action.payload;
      delete state.registerErrors[fieldName];
    },

    loginRequest: (state) => {
      state.loading = true;
      state.registerErrors = {};
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.loginErrors = {};
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = null;
      state.loginErrors = action.payload.errorMessage;
    },
    clearLoginError: (state, action) => {
      const fieldName = action.payload;
      delete state.loginErrors[fieldName];
    },
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.user = action.payload.user;
      state.addedUser = action.payload.addedUser;
    },
    loadUserFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = null;
      state.user = null;
    },
    addUserSuccess: (state, action) => {
      state.user = action.payload.user;
    },
    addUserFailure: (state) => {
      // state.loading = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = null;
    },
    logoutFailure: (state) => {
      state.loading = false;
    },
    editUserRequest: (state) => {
      state.loading = true;
    },
    editUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userId = action.payload.userId;
      state.user = action.payload.user;
    },
    editUserFailure: (state, action) => {
      state.loading = false;
      state.editErrors = action.payload.errorMessage;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  clearRegisterError,
  loginRequest,
  loginSuccess,
  loginFailure,
  clearLoginError,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  addUserSuccess,
  addUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
