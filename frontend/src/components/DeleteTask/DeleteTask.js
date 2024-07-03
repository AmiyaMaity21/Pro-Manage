import React from "react";
import "./DeleteTask.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../actions/taskAction";
const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    navigate("/");
  };
  return (
    <div className="modal-backdrop">
      <div className="delete-form">
        <p>Are you sure you want to Delete?</p>
        <div>
          <button className="confirm-delete" onClick={handleDeleteTask}>
            Yes, Delete
          </button>
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
