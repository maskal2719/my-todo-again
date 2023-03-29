import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    AddNewTasksArrayAC,
    AddTaskAC,
    ChangeStatusAC,
    RemoveTaskAC,
    TasksReducer,
    UpdateTaskTitleAC
} from "./state/tasks-reducer";

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
export type TasksStateType = {
    [key: string] :TaskDataType[]
}
function App() {
    // Стейты-----------------------------------------------------------
    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ])
    let [tasksObj, dispathTasks] = useReducer(TasksReducer,{
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
    // Стейты-----------------------------------------------------------


    //Функции обработки-----------------------------------------------
    const changeFilter = (todolistId: string, filter: FilterType) => {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if(todolist) {
        //     todolist.filter = filter
        // }
        // setTodolists([...todolists])
        dispatchTodolists(ChangeTodolistFilterAC(filter, todolistId))
    }
    const removeTask = (todolistId: string,id: string) => {
        dispathTasks(RemoveTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string,title: string) => {
        dispathTasks(AddTaskAC(todolistId, title))
    }
    const changeStatus = (todolistId: string,id: string, isDone: boolean) => {
        // let task = tasks.find(task => task.id === id);
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
        // setTasks(tasks.map(task => task.id === id ? {...task, isDone: isDone} : task))
        dispathTasks(ChangeStatusAC(todolistId,id,isDone))
    }
    const removeTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasksObj[todolistId]
        // setTasks({...tasksObj})
        dispatchTodolists(RemoveTodolistAC(todolistId))
    }

    //Функции обработки-----------------------------------------------
    const addTodolist = (newTitle: string) => {
        const newId = v1()
        // let newTodoList: TodolistType = {id: newId, title: newTitle, filter: 'all'}
        // setTodolists([newTodoList, ...todolists])
        // setTasks({...tasksObj, [newId]: []})
        dispatchTodolists(AddTodolistAC(newTitle))
        dispathTasks(AddNewTasksArrayAC(newId))
        console.log(tasksObj)
        console.log(todolists)
    }


    const updateTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispathTasks(UpdateTaskTitleAC(todolistId, title, taskId))
    }
    const updateTodolistTitle = (title: string, todolistId: string) => {
       // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title} : el))
        dispatchTodolists(ChangeTodolistTitleAC(title, todolistId))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
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
                    updateTaskTitle={updateTaskTitle}
                    updateTodolistTitle={updateTodolistTitle}
                />
            })}

        </div>
    );
}

export default App;
