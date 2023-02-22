import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskDataType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    // Стейты-----------------------------------------------------------
    const [tasks, setTasks] = useState<TaskDataType[]>([
        {id: v1(), title: 'Html', isDone: true},
        {id: v1(), title: 'Css', isDone: true},
        {id: v1(), title: 'Js', isDone: false},
        {id: v1(), title: 'Ts', isDone: false},
        {id: v1(), title: 'Angular', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    console.log(filter)

    // Стейты-----------------------------------------------------------


    //Функции обработки-----------------------------------------------
    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    const filterTask = (tasks: TaskDataType[], filter: FilterType) => {
        if (filter === 'active') {
            return tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            return tasks.filter(task => task.isDone)
        }
        return tasks
    }
    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks])
    }
    const changeStatus = (id: string, isDone: boolean) => {
        // let task = tasks.find(task => task.id === id);
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
        setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone}: task))
    }

    //Функции обработки-----------------------------------------------


    const filteredTasks = filterTask(tasks, filter)

    return (
        <div className="App">
            <TodoList todoListTitle={'What to learn'}
                      todoListTasks={filteredTasks}
                      changeFilter={changeFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
