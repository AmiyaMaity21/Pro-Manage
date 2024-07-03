import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "./AddTask.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../actions/taskAction";
import { formatDate } from "../../utils/dateUtils";

const getUserLogo = (email) => {
  const parts = email.split("@")[0];
  return parts.slice(0, 2).toUpperCase();
};

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user } = useSelector((state) => state.user);
  const [stateData] = useState(state?.taskData);
  const [formData, setFormData] = useState({
    title: stateData?.title || "",
    priority: stateData?.priority || "",
    assignUser: stateData?.assignUser || "",
    dueDate: (stateData?.dueDate && formatDate(stateData?.dueDate, "us")) || "",
    checklists:
      stateData?.checklists.map((checklist, index) => ({
        ...checklist,
        id: checklist._id || index + 1,
      })) || [],
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSelect = (user) => {
    setFormData((prev) => ({ ...prev, assignUser: user }));
    setIsDropdownOpen(false);
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    const dueDate = dateValue ? dateValue.split("-").reverse().join("/") : "";
    setFormData((prev) => ({ ...prev, dueDate }));
  };

  const handleChecklistChange = (checklistId, key, value) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.map((checklist) =>
        checklist.id === checklistId
          ? { ...checklist, [key]: value }
          : checklist
      ),
    }));
  };

  const handleAddChecklist = () => {
    setFormData((prev) => ({
      ...prev,
      checklists: [
        ...prev.checklists,
        { id: prev.checklists.length + 1, text: "", checked: false },
      ],
    }));
  };

  const handleDeleteTask = (checklistId) => {
    setFormData((prev) => ({
      ...prev,
      checklists: prev.checklists.filter(
        (checklist) => checklist.id !== checklistId
      ),
    }));
  };

  const handleCreateTask = (event) => {
    event.preventDefault();
    if (state?.edit) {
      dispatch(updateTask(state.id, formData));
      navigate("/");
    } else {
      dispatch(createTask(formData));
      navigate("/");
    }
  };
  return (
    <div className="modal-backdrop">
      <div className="add-task-Form">
        <p>
          Title<span className="required">*</span>
        </p>
        <input
          type="text"
          name="title"
          placeholder="Enter Task Title"
          className="title-inputField"
          value={formData.title}
          onChange={handleChange}
        />
        <div className="priority-list">
          <p>
            Select Priority<span className="required">*</span>
          </p>
          {["high", "moderate", "low"].map((level) => (
            <li
              key={level}
              className={`priority-item ${level} ${
                formData.priority === level ? "selected" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: level }))
              }
            >
              {`${level.toUpperCase()} PRIORITY`}
            </li>
          ))}
        </div>
        <div className="assign-field">
          <label>Assign to</label>
          <div className="custom-select">
            <div className="selected-user">
              {formData.assignUser ? formData.assignUser : "Add a assignee"}
              <button
                className="dropdown-button"
                disabled={user?.addedUser?.length === 0}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <RiArrowDownSLine />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="options">
                {user?.addedUser?.map((user, index) => (
                  <div
                    key={index}
                    className="user-option"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="logo">{getUserLogo(user)}</div>
                    <div className="email">{user}</div>
                    <button>Assign</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="checklists-container">
          <p>
            Checklist (
            {
              formData.checklists.filter((checklist) => checklist.checked)
                .length
            }
            /{formData.checklists.length})<span className="required">*</span>
          </p>
          <div className="checklists">
            {formData.checklists.map((checklist) => (
              <div key={checklist.id} className="checklist-inputContainer">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={checklist.checked}
                  onChange={() =>
                    handleChecklistChange(
                      checklist.id,
                      "checked",
                      !checklist.checked
                    )
                  }
                />
                <input
                  type="text"
                  className="checklist-inputField"
                  value={checklist.text}
                  onChange={(e) =>
                    handleChecklistChange(checklist.id, "text", e.target.value)
                  }
                />
                <button
                  className="delBtn"
                  onClick={() => handleDeleteTask(checklist.id)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        </div>
        <p className="addTask" onClick={handleAddChecklist}>
          + Add New
        </p>
        <div className="form-bottom">
          <div
            className="date-picker-container"
            onClick={() =>
              document.getElementById("hiddenDateInput").showPicker()
            }
          >
            <input
              id="hiddenDateInput"
              type="date"
              className="hidden-date-field"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <input
              type="text"
              className="due-date-field"
              value={formData.dueDate}
              placeholder="Select Due Date"
              readOnly
            />
          </div>
          <div className="form-button-container">
            <button className="cancel-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleCreateTask}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
