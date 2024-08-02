import React, { useEffect } from "react";
import Menu from "../Menu/Menu";
import "./Analytics.css";
import AnalyticsCard from "./AnalyticsCard";
import { getTasksByUser } from "../../actions/taskAction";
import { useDispatch, useSelector } from "react-redux";

const Analytics = () => {
  const dispatch = useDispatch();
  const { userTasks } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasksByUser());
  }, [dispatch]);

  // Function to calculate task counts
  const calculateTaskCounts = () => {
    if (!userTasks) {
      return {
        backlogCount: 0,
        todoCount: 0,
        progressCount: 0,
        doneCount: 0,
        lowPriorityCount: 0,
        moderatePriorityCount: 0,
        highPriorityCount: 0,
        dueDateTasksCount: 0,
      };
    }

    return userTasks.reduce((counts, task) => {
      const { taskStatus, priority, dueDate } = task;

      counts[`${taskStatus}Count`] = (counts[`${taskStatus.toLowerCase()}Count`] || 0) + 1;
      counts[`${priority}PriorityCount`] = (counts[`${priority.toLowerCase()}PriorityCount`] || 0) + 1;

      if (dueDate) {
        counts.dueDateTasksCount = (counts.dueDateTasksCount || 0) + 1;
      }

      return counts;
    }, {
      backlogCount: 0,
      todoCount: 0,
      progressCount: 0,
      doneCount: 0,
      lowPriorityCount: 0,
      moderatePriorityCount: 0,
      highPriorityCount: 0,
      dueDateTasksCount: 0,
    });
  };

  // Destructure task counts with default values
  const {
    backlogCount,
    todoCount,
    progressCount,
    doneCount,
    lowPriorityCount,
    moderatePriorityCount,
    highPriorityCount,
    dueDateTasksCount,
  } = calculateTaskCounts();

  return (
    <div className="analytics">
      <Menu />
      <div className="analytics-container">
        <h2>Analytics</h2>
        <div className="analytics-content">
          <AnalyticsCard tasks={[
            { title: "Backlog Tasks", count: backlogCount },
            { title: "To-do Tasks", count: todoCount },
            { title: "In-Progress Tasks", count: progressCount },
            { title: "Completed Tasks", count: doneCount },
          ]} />
          <AnalyticsCard tasks={[
            { title: "Low Priority", count: lowPriorityCount },
            { title: "Moderate Priority", count: moderatePriorityCount },
            { title: "High Priority", count: highPriorityCount },
            { title: "Due Date Tasks", count: dueDateTasksCount },
          ]} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
