import React, { useEffect, useState } from "react";
import "./Board.css";
import AddPeopleForm from "../AddPeopleForm/AddPeopleForm";
import TaskSection from "./TaskSection";
import { FaAngleDown } from "react-icons/fa6";
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

  const [selectedDateRange, setSelectedDateRange] = useState("This Week");
  const [filterMenu, setFilterMenu] = useState(false);
  const [addPeople, setAddPeople] = useState(false);

  useEffect(() => {
    const dateRange = selectedDateRange.toLowerCase();
    dispatch(getTasksByUser(dateRange));
  }, [dispatch, selectedDateRange, newTask, isDeletedTask, isUpdatedTask]);

  return (
    <div className="board">
      <Menu />
      <div className="board-container">
        <div className="board-head">
          <h2>Welcome! {user?.name}</h2>
          <p>{formatDate()}</p>
        </div>
        <div className="board-title-section">
          <div className="board-title">
            <p>Board</p>
            <i onClick={() => setAddPeople(!addPeople)}>
              <GoPeople /> <span>Add People</span>
            </i>
            {addPeople && (
              <AddPeopleForm onClose={() => setAddPeople(!addPeople)} />
            )}
          </div>
          <div className="filterTask">
            <p>{selectedDateRange}</p>
            <i onClick={() => setFilterMenu(!filterMenu)}>
              <FaAngleDown />
            </i>
            {filterMenu && (
              <div className="filter-menu">
                {["Today", "This Week", "This Month"].map(
                  (dateRange, index) => (
                    <p
                      key={index}
                      onClick={() => setSelectedDateRange(dateRange)}
                    >
                      {dateRange}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="tasks">
          <TaskSection
            title="Backlog"
            tasks={userTasks?.filter((task) => task.taskStatus === "backlog")}
          />
          <TaskSection
            title="To do"
            tasks={userTasks?.filter((task) => task.taskStatus === "todo")}
          />
          <TaskSection
            title="In progress"
            tasks={userTasks?.filter((task) => task.taskStatus === "progress")}
          />
          <TaskSection
            title="Done"
            tasks={userTasks?.filter((task) => task.taskStatus === "done")}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
