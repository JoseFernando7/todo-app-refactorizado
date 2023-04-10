import { useReducer, useState } from 'react'

const tasks =
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

let newId = 2;

const reducer = (state, action) =>
{
  switch (action.type) 
  {
    case "ADD_TASK":
      const { name } = action.payload;

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

function App() 
{
  const [inputText, setInputText] = useState("");
  const [state, dispatch] = useReducer(reducer, tasks);

  const handleChange = ({ target }) => setInputText(target.value);

  const handleAddTask = (e) =>
  {
    e.preventDefault()
    dispatch({ type: "ADD_TASK", payload: {name: inputText} });

    newId++;
    console.log(newId);

    setInputText("");
  }

  const handleToggleCompleted = (id) =>
  {
    dispatch({ type: "TASK_COMPLETED", payload: {id} });
    console.log("Uncompleted tasks: ", state.uncompletedTasks);
    console.log("Completed tasks", state.completedTasks);
  }

  const handleDeleteUncompletedTask = (id) =>
  {
    dispatch({ type: "DELETE_UNCOMPLETED_TASK", payload: {id} });
  }

  const handleDeleteCompletedTask = (id) =>
  {
    dispatch({ type: "DELETE_COMPLETED_TASK", payload: {id} });
  }

  return (
    <>
      <h1> To-Do </h1>

      <div>
        <div>
          <h2> Tareas Incompletas </h2>
          <ul>
            {state.uncompletedTasks.map(({ name, isCompleted, id }) => 
              <div key={id}>
                <li> 
                  <h4> { name } </h4>
                  <p> Id: { id } </p>
                </li>
                <input type="checkbox" onClick={() => handleToggleCompleted(id)} defaultChecked={isCompleted}/>
                <button onClick={() => handleDeleteUncompletedTask(id)}> Delete </button>
              </div>
            )}
          </ul>
        </div>
        
        <div>
          <h2> Tareas Completadas </h2>
          <ul>
            {state.completedTasks.map(({ name, isCompleted, id }) =>
              <div key={id}>
                <li style={{ textDecoration: "line-through"}}>
                  <h4> { name } </h4>
                  <p> Id: { id } </p>
                </li>
                <input type="checkbox" onClick={() => handleToggleCompleted(id)} defaultChecked={isCompleted} disabled/>
                <button onClick={() => handleDeleteCompletedTask(id)}> Delete </button>
              </div>
            )}
          </ul>
        </div>
      </div>

      <div>
        <form onSubmit={handleAddTask}>
          <input type="text" placeholder='Añadir tarea' onChange={handleChange} value={inputText}/>
          <button type='submit' onClick={handleAddTask}> Add </button>
        </form>
      </div>
    </>
  );
}

export default App