import React, {useReducer} from 'react';
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
    AddTaskAC,
    ChangeStatusAC,
    RemoveTaskAC,
    TasksReducer,
    UpdateTaskTitleAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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
    [key: string]: TaskDataType[]
}

function AppWithRedux() {
    // Стейты-----------------------------------------------------------

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = (todolistId: string, id: string) => {
        dispatch(RemoveTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(AddTaskAC(todolistId, title))
    }
    const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(ChangeStatusAC(todolistId, id, isDone))
    }
    const updateTaskTitle = (title: string, todolistId: string, taskId: string) => {
        dispatch(UpdateTaskTitleAC(todolistId, title, taskId))
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(filter, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodolist = (newTitle: string) => {
        const action = AddTodolistAC(newTitle)
        dispatch(action)
    }
    const updateTodolistTitle = (title: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleAC(title, todolistId))
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
                let filteredTasks = filterTask(tasks[tl.id], tl.filter)

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

export default AppWithRedux;
