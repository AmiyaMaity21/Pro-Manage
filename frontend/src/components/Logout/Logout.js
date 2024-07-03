import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";
const Logout = ({ onClose }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="modal-backdrop">
      <div className="delete-form">
        <p>Are you sure you want to Logout?</p>
        <div>
          <button className="confirm-delete" onClick={handleLogout}>
            Yes, Logout
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
