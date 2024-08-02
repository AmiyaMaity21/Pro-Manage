import React, { useState } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
const TaskSection = (props) => {
  const { title, tasks } = props;
  const navigate = useNavigate();
  const [expandedChecklist, setExpandedChecklist] = useState([]);
  const [taskMenu, setTaskMenu] = useState("");

  const handleToggleState = (taskId) => {
    setExpandedChecklist((prevState) =>
      prevState.includes(taskId)
        ? prevState.filter((id) => id !== taskId)
        : [...prevState, taskId]
    );
  };

  const collapseAll = (tasks) => {
    setExpandedChecklist((prevState) =>
      prevState.filter((id) => !tasks.some((task) => task._id === id))
    );
  };

  const handleDotClick = (taskId) => {
    setTaskMenu(taskMenu === taskId ? "" : taskId);
  };

  return (
    <div className="board-task">
      <div className="task-top">
        <p>{title}</p>
        <div className="plus-collapse">
          {title === "To do" && (
            <i className="plus-icon" onClick={() => navigate("/task-post")}>
              <LuPlus />
            </i>
          )}
          <i onClick={() => collapseAll(tasks)}>
            <VscCollapseAll />
          </i>
        </div>
      </div>
      <div className="task-items">
        {tasks?.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            expandedChecklist={expandedChecklist}
            handleToggleState={handleToggleState}
            handleDotClick={handleDotClick}
            taskMenu={taskMenu}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskSection;
