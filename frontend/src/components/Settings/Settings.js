import React, { useState } from "react";
import Menu from "../Menu/Menu";
import "./Settings.css";
import { FaRegUser } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { TfiLock } from "react-icons/tfi";
import { FiEye } from "react-icons/fi";
import { BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction";

const Settings = () => {
  const dispatch = useDispatch();
  const [visibleField, setVisibleField] = useState("");
  const { editErrors, user } = useSelector((state) => state.user);
  const [editFormData, setEditFormData] = useState({
    name: "" || user?.name,
    email: "" || user?.email,
    oldPassword: "",
    newPassword: "",
  });
  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };
  const editFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(editFormData));
    setEditFormData("");
  };
  return (
    <div className="settings">
      <Menu />
      <div className="settings-container">
        <h2>Settings</h2>
        <form onSubmit={editFormSubmit} className="edit-form">
          <div className="inputContainer">
            <i className="icon">
              <FaRegUser />
            </i>
            <input
              type="text"
              placeholder="Name"
              value={editFormData.name}
              name="name"
              onChange={handleEditFormChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <i className="icon">
              <LuMail />
            </i>
            <input
              type="email"
              placeholder="Update Email"
              value={editFormData.email}
              name="email"
              onChange={handleEditFormChange}
              className="inputField"
            />
          </div>
          <div className="inputContainer">
            <i className="icon">
              <TfiLock />
            </i>
            <input
              type={visibleField === "password" ? "text" : "password"}
              placeholder="Old Password"
              value={editFormData.oldPassword}
              name="oldPassword"
              onChange={handleEditFormChange}
              className="inputField"
            />
            <i
              className="showPassword"
              onClick={() =>
                setVisibleField(visibleField === "password" ? "" : "password")
              }
            >
              {visibleField === "password" ? <BsEyeSlash /> : <FiEye />}
            </i>
            {editErrors && <p>{editErrors}</p>}
          </div>
          <div className="inputContainer">
            <i className="icon">
              <TfiLock />
            </i>
            <input
              type={visibleField === "confirmPassword" ? "text" : "password"}
              placeholder="New Password"
              value={editFormData.newPassword}
              name="newPassword"
              onChange={handleEditFormChange}
              className="inputField"
            />
            <i
              className="showPassword"
              onClick={() =>
                setVisibleField(
                  visibleField === "confirmPassword" ? "" : "confirmPassword"
                )
              }
            >
              {visibleField === "confirmPassword" ? <BsEyeSlash /> : <FiEye />}
            </i>
          </div>
          <button className="edit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
