import { createContext } from "react";

export const tasks =
{
  uncompletedTasks: 
  [
    {
      id: 1,
      name: "Terminar el to-do",
      isCompleted: false
    }
  ],
  completedTasks: 
  [
    {
      id: 2,
      name: "Comer",
      isCompleted: true
    }
  ]
};

export const TaskContext = createContext(tasks);
