import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import {v1} from "uuid";
import SuperInput from "./components/SuperInput/SuperInput";
import SuperButton from "./components/SuperButton/SuperButton";

export type TaskDataType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {
    // Стейты-----------------------------------------------------------

    // Стейты-----------------------------------------------------------


    //Функции обработки-----------------------------------------------
    const changeFilter = (todolistId: string, filter: FilterType) => {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if(todolist) {
        //     todolist.filter = filter
        // }
        // setTodolists([...todolists])
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTask = (todolistId: string,id: string) => {
        setTasks({...tasksObj,[todolistId]: tasksObj[todolistId].filter(t=> t.id !== id)})
    }
    const addTask = (todolistId: string,title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasksObj,[todolistId]: [newTask, ...tasksObj[todolistId]]})
    }
    const changeStatus = (todolistId: string,id: string, isDone: boolean) => {
        // let task = tasks.find(task => task.id === id);
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
        // setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone} : task))
        setTasks( {...tasksObj,[todolistId]: tasksObj[todolistId].map(task => task.id === id ? {...task, isDone: isDone} : task)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    //Функции обработки-----------------------------------------------

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'active'},
            {id: todolistId2, title: 'What to buy', filter: 'completed'}
        ]
    )

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'Js', isDone: false},
            {id: v1(), title: 'Ts', isDone: false},
            {id: v1(), title: 'Angular', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Яйца', isDone: true},
            {id: v1(), title: 'Хлеб', isDone: true},
            {id: v1(), title: 'Картофель', isDone: false},
            {id: v1(), title: 'Гречка', isDone: false},
            {id: v1(), title: 'Мясо', isDone: true},
            {id: v1(), title: 'Рыба', isDone: false},
            {id: v1(), title: 'Овощи', isDone: false},
        ],
    })

    return (
        <div className="App">
            {todolists.map((tl) => {
                const filterTask = (tasks: TaskDataType[], filter: FilterType) => {
                    if (tl.filter === 'active') {
                        return tasks.filter(task => !task.isDone)
                    }
                    if (tl.filter === 'completed') {
                        return tasks.filter(task => task.isDone)
                    }
                    return tasks
                }
                let filteredTasks = filterTask(tasksObj[tl.id], tl.filter)

                return <TodoList
                    key={tl.id}
                    todoListTitle={tl.title}
                    todolistId={tl.id}
                    todoListTasks={filteredTasks}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}

        </div>
    );
}

export default App;
