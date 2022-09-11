import { useEffect, useState } from 'react';

interface Task {
  id: string;
  value: string;
}

export function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskValue, setTaskValue] = useState('');

  // Use Effect que não monitora nada executa apenas uma vez no início da renderização do componente
  // Pode ser usado para buscar dados de uma API
  useEffect(() => {
    console.log('SIDE EFFECT: INICIO COMPONENTE');
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      console.log('LISTA SALVA!');
    }
  }, [taskList]);

  function addNewTask() {
    if (!taskValue) return;
    
    const newTask: Task = {
      id: new Date().getTime().toString(),
      value: taskValue,
    };

    setTaskList((state) => [...state, newTask]);
    resetForm();
  }

  function removeTask(taskId: string) {
    const taskListWithoutRemovedTask = taskList.filter(
      (task) => task.id != taskId
    );

    setTaskList(taskListWithoutRemovedTask);
  }

  function resetForm() {
    setTaskValue('');
  }

  return (
    <div>
      <h1>Todo List</h1>

      <h3>Tasks:</h3>
      <ul>
        {taskList.map((item) => (
          <li key={item.id}>
            <span>{item.value}</span>
            {' - '}
            <button onClick={() => removeTask(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <p>
        <label>Task: </label>
        <input
          type='text'
          name='task'
          id='task'
          onChange={(e) => setTaskValue(e.target.value)}
          value={taskValue}
        />
      </p>

      <p>
        <button onClick={addNewTask}>Add Task</button>
      </p>
    </div>
  );
}
