import UseTask from './hooks/UseTask';

function App() {
  
  const { handleAddTask,
    handleDeleteCompletedTask, 
    handleToggleCompleted, 
    handleDeleteUncompletedTask, 
    handleChange,
    stateComplete,
    stateUncomplete,
    inputText } = UseTask();

  return (
    <>
      <h1> To-Do </h1>

      <div>
        <div>
          <h2> Tareas Incompletas </h2>
          <ul>
            {stateUncomplete.map(({ name, isCompleted, id }) =>
              <div key={id}>
                <li>
                  <h4> {name} </h4>
                  <p> Id: {id} </p>
                </li>
                <input type="checkbox" onClick={() => handleToggleCompleted(id)} defaultChecked={isCompleted} />
                <button onClick={() => handleDeleteUncompletedTask(id)}> Delete </button>
              </div>
            )}
          </ul>
        </div>

        <div>
          <h2> Tareas Completadas </h2>
          <ul>
            {stateComplete.map(({ name, isCompleted, id }) =>
              <div key={id}>
                <li style={{ textDecoration: "line-through" }}>
                  <h4> {name} </h4>
                  <p> Id: {id} </p>
                </li>
                <input type="checkbox" onClick={() => handleToggleCompleted(id)} defaultChecked={isCompleted} disabled />
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