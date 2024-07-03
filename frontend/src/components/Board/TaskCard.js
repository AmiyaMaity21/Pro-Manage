import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/dateUtils";
import { updateTask } from "../../actions/taskAction";
const TaskCard = (props) => {
  const {
    task,
    expandedChecklist,
    handleToggleState,
    showPopup,
    setShowPopup,
  } = props;
  const [linkCopied, setLinkCopied] = useState(false);
  const { user } = useSelector((state) => state.user);
  console.log(user.email);
  console.log(task.assignUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask(taskId, { taskStatus: newStatus }));
  };

  const renderStatusButtons = () => {
    const statusOptions = ["backlog", "todo", "progress", "done"];
    const filteredOptions = statusOptions.filter(
      (status) => status !== task.taskStatus
    );

    return (
      <div>
        {filteredOptions.map((status) => (
          <p key={status} onClick={() => handleStatusChange(task._id, status)}>
            {status.toUpperCase()}
          </p>
        ))}
      </div>
    );
  };
  const handleEditClick = () => {
      setShowPopup("");
      navigate("/task-post", {
        state: { id: task._id, taskData: task, edit: true },
      });
  };
  const handleShare = () => {
    const taskLink = `${window.location.origin}/task/${task._id}`;
    navigator.clipboard.writeText(taskLink).then(() => {
      setShowPopup("");
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };
  const handledeleteClick = () => {
    setShowPopup("");
    navigate(`/delete/${task._id}`);
  };
  const handleChecklistChange = (taskId, checklistIndex) => {
    const updatedChecklists = task.checklists.map((checklist, index) =>
      index === checklistIndex
        ? { ...checklist, checked: !checklist.checked }
        : checklist
    );
    dispatch(updateTask(taskId, { checklists: updatedChecklists }));
  };
  const getUserLogo = (email) => {
    const parts = email.split("@")[0];
    return parts.slice(0, 2).toUpperCase();
  };
  return (
    <div className="task-item">
      <div className="item-head">
        <li
          className={`priority-status ${task.priority}`}
        >{`${task.priority.toUpperCase()} PRIORITY`}</li>
        {task.assignUser && (
          <p className="user-logo">{getUserLogo(task?.assignUser)}</p>
        )}
        <i
          className="dot"
          onClick={() => setShowPopup(showPopup === task._id ? "" : task._id)}
        >
          <HiOutlineDotsHorizontal />
        </i>
        {showPopup === task._id && (
          <div className="popup-menu">
            <p onClick={handleEditClick}>Edit</p>
            <p onClick={handleShare}>Share</p>
            <p className="deletebtn" onClick={handledeleteClick}>
              Delete
            </p>
          </div>
        )}
      </div>
      <p>{task.title}</p>
      <div className="item-checklist">
        <p>
          Checklist (
          {task.checklists.filter((checklist) => checklist.checked).length}/
          {task.checklists.length})
        </p>
        <i className="up-down" onClick={() => handleToggleState(task._id)}>
          {expandedChecklist.includes(task._id) ? (
            <FaAngleUp />
          ) : (
            <FaAngleDown />
          )}
        </i>
      </div>
      {expandedChecklist.includes(task._id) && (
        <div className="item-details">
          {task.checklists.map((checklist, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={checklist.checked}
                onChange={() => handleChecklistChange(task._id, index)}
              />
              <p>{checklist.text}</p>
            </div>
          ))}
        </div>
      )}
      <div className="swapTask">
        {task.dueDate && (
          <p
            className={
              task.taskStatus === "done" ? "due-date-green" : "due-date-red"
            }
          >
            {formatDate(task.dueDate)}
          </p>
        )}
        {renderStatusButtons()}
      </div>
      {linkCopied && <p className="link-copied-message">Link copied</p>}
    </div>
  );
};

export default TaskCard;
