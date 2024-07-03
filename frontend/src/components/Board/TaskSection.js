import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
const TaskSection = (props) => {
  const {
    title,
    tasks,
    showAddButton,
    expandedChecklist,
    handleToggleState,
    collapseAll,
    showPopup,
    setShowPopup,
  } = props;

  const navigate = useNavigate();
  return (
    <div className="board-task">
      <div className="task-top">
        <p>{title}</p>
        <div className="plus-collapse">
          {showAddButton && (
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
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskSection;
