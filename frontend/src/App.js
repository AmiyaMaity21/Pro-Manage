import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/RegisterLogin/Login";
import Register from "./components/RegisterLogin/Register";
import Board from "./components/Board/Board";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings";
import AddTask from "./components/AddTask/AddTask";
import DeleteTask from "./components/DeleteTask/DeleteTask";
import TaskDetails from "./components/TaskDetails/TaskDetails";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-post"
          element={
            <ProtectedRoute>
              <>
                <Board />
                <AddTask />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete/:id"
          element={
            <ProtectedRoute>
              <>
                <Board />
                <DeleteTask />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
