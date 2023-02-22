import React, {ChangeEvent, FC, useState} from 'react';
import SuperButton from "../SuperButton/SuperButton";
import TasksList from "../TasksList/TasksList";
import {FilterType, TaskDataType} from "../../App";

type TodoListPropsType = {
    todoListTitle: string
    todoListTasks: TaskDataType[]
    changeFilter: (filter: FilterType) => void
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterType
}

const TodoList: FC<TodoListPropsType> = ({
                                             todoListTitle,
                                             todoListTasks,
                                             changeFilter,
                                             removeTask,
                                             addTask,
                                             changeStatus,
                                             filter
                                         }) => {

    const [inputValue, setInputValue] = useState('')
    const [err, setErr] = useState<string | null>(null)
    const setFilter = (filter: FilterType) => {
        changeFilter(filter)
    }
    const setInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setErr('')
    }
    const onClickAddTaskHandler = () => {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setErr('Ошибка! Поле не может быть пустым!')
        }
    }
    const onKeyPressAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && onClickAddTaskHandler()
    }

    const isAddBtnDisabled = inputValue.length < 3 || inputValue.length > 15


    return (
        <div className={'todo'}>
            <h3>{todoListTitle}</h3>
            <div>
                <input
                    className={err ? 'errInput' : ''}
                    value={inputValue}
                    onChange={setInputValueChange}
                    type="text"
                    onKeyUp={onKeyPressAddTaskHandler}
                />
                <SuperButton
                    disabled={isAddBtnDisabled}
                    callBack={onClickAddTaskHandler}
                    btnName={'+'}
                />
                <div className={'errMsg'}>{err}</div>
            </div>
            <ul>
                <TasksList
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