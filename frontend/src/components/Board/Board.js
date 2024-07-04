import React, { useEffect, useState } from "react";
import "./Board.css";
import AddPeopleForm from "../AddPeopleForm/AddPeopleForm";
import TaskSection from "./TaskSection";
import { useDispatch, useSelector } from "react-redux";
import { GoPeople } from "react-icons/go";
import Menu from "../Menu/Menu";
import { getTasksByUser } from "../../actions/taskAction";
import { formatDate } from "../../utils/utils";

const Board = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userTasks, newTask, isDeletedTask, isUpdatedTask } = useSelector(
    (state) => state.task
  );

  const [expandedChecklist, setExpandedChecklist] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("week");
  const [addPeople, setAddPeople] = useState(false);
  const [showPopup, setShowPopup] = useState("");

  useEffect(() => {
    dispatch(getTasksByUser(selectedDateRange));
  }, [dispatch, selectedDateRange, newTask, isDeletedTask, isUpdatedTask]);

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

  return (
    <div className="board">
      <Menu />
      <div className="board-container">
        <div className="board-head">
          <h2>Welcome! {user?.name}</h2>
          <p>{formatDate()}</p>
        </div>
        <div className="board-title">
          <div>
            <p>Board</p>
            <i onClick={() => setAddPeople(!addPeople)}>
              <GoPeople /> Add People
            </i>
            {addPeople && (
              <AddPeopleForm onClose={() => setAddPeople(!addPeople)} />
            )}
          </div>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>
        <div className="tasks">
          <TaskSection
            title="Backlog"
            tasks={userTasks?.filter((task) => task.taskStatus === "backlog")}
            expandedChecklist={expandedChecklist}
            handleToggleState={handleToggleState}
            collapseAll={collapseAll}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
          <TaskSection
            title="To do"
            tasks={userTasks?.filter((task) => task.taskStatus === "todo")}
            showAddButton
            expandedChecklist={expandedChecklist}
            handleToggleState={handleToggleState}
            collapseAll={collapseAll}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
          <TaskSection
            title="In progress"
            tasks={userTasks?.filter(
              (task) => task.taskStatus === "progress"
            )}
            expandedChecklist={expandedChecklist}
            handleToggleState={handleToggleState}
            collapseAll={collapseAll}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
          <TaskSection
            title="Done"
            tasks={userTasks?.filter((task) => task.taskStatus === "done")}
            expandedChecklist={expandedChecklist}
            handleToggleState={handleToggleState}
            collapseAll={collapseAll}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
