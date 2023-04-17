import { useReducer, useState } from 'react';
import { tasks } from '../tasks';
import TaskReducer from '../reducer/TaskReducer';

let newId = 2;

export default function UseTask() 
{
  const [inputText, setInputText] = useState("");
  const [state, dispatch] = useReducer(TaskReducer, tasks);

  const stateUncomplete = state.uncompletedTasks
  const stateComplete = state.completedTasks

  const handleChange = ({ target }) => setInputText(target.value);

  const handleAddTask = (e) => 
  {
    e.preventDefault()
    dispatch({ type: "ADD_TASK", payload: { name: inputText, id: newId } });

    newId++;
    console.log(newId);

    setInputText("");
  }

  const handleToggleCompleted = (id) => 
  {
    dispatch({ type: "TASK_COMPLETED", payload: { id } });
    console.log("Uncompleted tasks: ", state.uncompletedTasks);
    console.log("Completed tasks", state.completedTasks);
  }

  const handleDeleteUncompletedTask = (id) => 
  {
    dispatch({ type: "DELETE_UNCOMPLETED_TASK", payload: { id } });
  }

  const handleDeleteCompletedTask = (id) => 
  {
    dispatch({ type: "DELETE_COMPLETED_TASK", payload: { id } });
  }

  return {
    handleAddTask,
    handleChange,
    handleDeleteCompletedTask,
    handleDeleteUncompletedTask,
    handleToggleCompleted,
    stateComplete,
    stateUncomplete,
    inputText
  }
}
