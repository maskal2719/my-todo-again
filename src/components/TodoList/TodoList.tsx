import React, {ChangeEvent, FC, useState} from 'react';
import SuperButton from "../SuperButton/SuperButton";
import TasksList from "../TasksList/TasksList";
import {FilterType, TaskDataType} from "../../App";
import SuperInput from "../SuperInput/SuperInput";

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

    const [inputValue, setInputValue] = useState('')
    const [err, setErr] = useState<string | null>(null)
    const setFilter = (filter: FilterType) => {
        changeFilter(todolistId, filter)
    }
    const setInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        setErr('')
    }
    const onClickAddTaskHandler = () => {
        if (inputValue.trim() !== '' && inputValue.length < 20) {
            addTask(todolistId, inputValue.trim())
            setInputValue('')
        } else {
            setErr('Ошибка! Поле не может быть пустым !')
        }
    }
    const onKeyPressAddTaskHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && onClickAddTaskHandler()
    }

    const isAddBtnDisabled = inputValue.length < 3 || inputValue.length > 20


    return (
        <div className={'todo'}>
            <h3>{todoListTitle} <SuperButton btnName={'x'} callBack={()=> removeTodolist(todolistId)}/></h3>
            <div>
                {/*<input*/}
                {/*    className={err ? 'errInput' : ''}*/}
                {/*    value={inputValue}*/}
                {/*    onChange={setInputValueChange}*/}
                {/*    type="text"*/}
                {/*    onKeyUp={onKeyPressAddTaskHandler}*/}
                {/*/>*/}
                <SuperInput type={"text"}
                            value={inputValue}
                            onChange={setInputValueChange}
                            onKeyUp={onKeyPressAddTaskHandler}
                            className={err ? 'errInput' : ''}
                />
                <SuperButton
                    disabled={isAddBtnDisabled}
                    callBack={onClickAddTaskHandler}
                    btnName={'+'}
                />
                {err && <div className={'errMsg'}>{err}</div>}
            </div>
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