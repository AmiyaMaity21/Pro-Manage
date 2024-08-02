import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utils/utils";
import { updateTask } from "../../actions/taskAction";
import { getUserLogo, isDueDatePassed } from "../../utils/utils";
const TaskCard = (props) => {
  const {
    task,
    expandedChecklist,
    handleToggleState,
    taskMenu,
    handleDotClick,
  } = props;
  const [linkCopied, setLinkCopied] = useState(false);

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
    handleDotClick(task._id);
    navigate("/task-post", {
      state: { id: task._id, taskData: task, edit: true },
    });
  };
  const handleShare = () => {
    const taskLink = `${window.location.origin}/task/${task._id}`;
    navigator.clipboard.writeText(taskLink).then(() => {
      handleDotClick(task._id);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };
  const handledeleteClick = () => {
    handleDotClick(task._id);
    navigate(`/delete/${task._id}`);
  };
  const handleChecklistUpdate = (taskId, checklistIndex) => {
    const updatedChecklists = task.checklists.map((checklist, index) =>
      index === checklistIndex
        ? { ...checklist, checked: !checklist.checked }
        : checklist
    );
    dispatch(updateTask(taskId, { checklists: updatedChecklists }));
  };

  return (
    <div className="task-item">
      <div className="item-head">
        <li className={`priority-status ${task.priority}`}>
          {`${task.priority.toUpperCase()} PRIORITY`}
          {task.assignUser && (
            <span className="user-logo">
              {getUserLogo(task?.assignUser)}
              <span className="tooltiptext">{task?.assignUser}</span>
            </span>
          )}
        </li>
        <i className="dot" onClick={() => handleDotClick(task._id)}>
          <HiOutlineDotsHorizontal />
        </i>
        {taskMenu === task._id && (
          <div className="popup-menu">
            <p onClick={handleEditClick}>Edit</p>
            <p onClick={handleShare}>Share</p>
            <p className="deletebtn" onClick={handledeleteClick}>
              Delete
            </p>
          </div>
        )}
      </div>
      <p className="task-title">
        {task.title.length > 25
          ? `${task.title.substring(0, 25)}...`
          : task.title}
        {task.title.length > 25 && (
          <span className="tooltiptext">{task.title}</span>
        )}
      </p>
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
                onChange={() => handleChecklistUpdate(task._id, index)}
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
              task.taskStatus === "done"
                ? "due-date-green"
                : isDueDatePassed(task.dueDate)
                ? "due-date-red"
                : "due-date-grey"
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
