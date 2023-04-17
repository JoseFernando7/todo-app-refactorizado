const TaskReducer = (state, action) =>
{
  console.log(action);

  switch (action.type) 
  {
    case "ADD_TASK":
      const { name, id: newId } = action.payload;

      return {
        ...state, 
        uncompletedTasks: [...state.uncompletedTasks, {id: newId, name, isCompleted: false}]
      };

    case "TASK_COMPLETED":
      const { id } = action.payload;

      const newTask = state.uncompletedTasks.map((task) => 
      {
        if (task.id === id)
        {
          return {
            ...task,
            isCompleted: !task.isCompleted
          }
        }

        return task;
      });
      //console.log(newTask);
      
      const newCompletedtask = newTask.filter((task) => task.isCompleted);
      const newUncompletedTasks = [...newTask.filter((task) => !task.isCompleted)];
      console.log(newCompletedtask);

      return {
        ...state,
        uncompletedTasks: newUncompletedTasks,
        completedTasks: state.completedTasks.concat(newCompletedtask)
      };

    case "TASK_UNCOMPLETED":
      const { id: uncompletedTaskId } = action.payload;

    case "DELETE_UNCOMPLETED_TASK":
      const { id: taskId } = action.payload;

      const updatedTasks = state.uncompletedTasks.filter(({id}) => id !== taskId);

      return {
        ...state,
        uncompletedTasks: updatedTasks
      };

    case "DELETE_COMPLETED_TASK":
      const { id: completedTaskId } = action.payload;

      const updatedCompletedTasks = state.completedTasks.filter(({id}) => id !== completedTaskId);

      return {
        ...state,
        completedTasks: updatedCompletedTasks
      };
  
    default:
      break;
  }
}

export default TaskReducer
