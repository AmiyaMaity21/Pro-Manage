import React, { useEffect } from "react";
import "./TaskDetails.css";
import codesandbox from "../../assets/codesandbox.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/utils";
import { getTask } from "../../actions/taskAction";
const TaskDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { task } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);
  return (
    <div className="task">
      <div className="task-head">
        <img src={codesandbox} alt="Code Sandbox" />
        <p>Pro Manage</p>
      </div>
      <div className="task-detalis">
        <li className={`prio ${task?.priority}`}>
          {task?.priority.toUpperCase()} PRIORITY
        </li>
        <p>{task?.title}</p>
        <div className="checklists-container">
          <p>
            Checklist (
            {task?.checklists.filter((checklist) => checklist.checked).length}/
            {task?.checklists.length})
          </p>
          <div className="checklists">
            {task?.checklists.map((checklist) => {
              return (
                <div className="checklist-item" key={checklist._id}>
                  <input type="checkbox" checked={checklist.checked} />
                  <p>{checklist.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        {task?.dueDate && (
          <div className="dueDate-field">
            <p>Due Date</p>
            <p className="dueDate">{formatDate(task.dueDate)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
