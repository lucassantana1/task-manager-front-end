import { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'

import './Tasks.scss'

import TaskItem from './TaskItem'
import AddTask from './AddTask'

const Tasks = () => {
  const [tasks, setTasks] = useState([])

  const alert = useAlert()

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`)

      setTasks(data)
    } catch (_error) {
      alert.error('Nao foi possivel recuperar as tarefas.')
    }
  }, [alert])

  const lastTasks = useMemo(() => {
    return tasks.filter((task) => task.isCompleted === false)
  }, [tasks])

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.isCompleted === true)
  }, [tasks])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="tasks-container">
      <h2>Minhas Tarefas</h2>

      <div className="last-tasks">
        <h3>Últimas Tarefas</h3>
        <AddTask fetchTasks={fetchTasks} />
        <div className="tasks-list">
          {lastTasks
            .filter((task) => task.isCompleted === false)
            .map((lastTask) => (
              <TaskItem
                key={lastTask._id}
                task={lastTask}
                fetchTasks={fetchTasks}
              />
            ))}
        </div>
      </div>

      <div className="completed-tasks">
        <h3>Tarefas Concluídas</h3>
        <div className="tasks-list">
          {completedTasks
            .filter((task) => task.isCompleted)
            .map((completedTask) => (
              <TaskItem
                key={completedTask._id}
                task={completedTask}
                fetchTasks={fetchTasks}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
