import React, {ChangeEvent, FC, useState} from 'react';
import SuperButton from "../SuperButton/SuperButton";
import TasksList from "../TasksList/TasksList";
import {FilterType, TaskDataType} from "../../App";
import SuperInput from "../SuperInput/SuperInput";
import AddItemForm from "../AddItemForm/AddItemForm";

type TodoListPropsType = {
    todoListTitle: string
    todoListTasks: TaskDataType[]
    changeFilter: (todolistId: string, filter: FilterType) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

const TodoList: FC<TodoListPropsType> = ({
                                             todoListTitle,
                                             todoListTasks,
                                             changeFilter,
                                             removeTask,
                                             addTask,
                                             changeStatus,
                                             filter,
                                             todolistId,
                                             removeTodolist
                                         }) => {

    const setFilter = (filter: FilterType) => {
        changeFilter(todolistId, filter)
    }
    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }

    return (
        <div className={'todo'}>
            <h3>{todoListTitle} <SuperButton btnName={'x'} callBack={()=> removeTodolist(todolistId)}/></h3>
            <AddItemForm callBack={addTaskHandler} />
            <ul>
                <TasksList
                    todolistId={todolistId}
                    todoListTasks={todoListTasks}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                />
            </ul>
            <div className={'filterBtns'}>
                <SuperButton className={filter === "all" ? 'activeFilterBtn' : ''} btnName={'all'}
                             callBack={() => setFilter('all')}/>
                <SuperButton className={filter === "active" ? 'activeFilterBtn' : ''} btnName={'active'}
                             callBack={() => setFilter('active')}/>
                <SuperButton className={filter === "completed" ? 'activeFilterBtn' : ''} btnName={'complete'}
                             callBack={() => setFilter('completed')}/>
            </div>
        </div>
    );
};

export default TodoList;