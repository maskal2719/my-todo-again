import React, {ChangeEvent, FC} from 'react';
import {TaskDataType} from "../../App";
import SuperButton from "../SuperButton/SuperButton";
import SuperInput from "../SuperInput/SuperInput";

type TasksList = {
    todoListTasks: TaskDataType[]
    removeTask: (todolistId: string,id: string) => void
    changeStatus: (todolistId:string, id: string, isDone: boolean) => void
    todolistId: string
}
const TasksList: FC<TasksList> = ({todoListTasks, removeTask, changeStatus, todolistId}) => {

    let tasks = todoListTasks.length
        ? todoListTasks.map((task) => {

            const removeTaskHandler = () => removeTask(todolistId,task.id)
            const onChangeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatus(todolistId,task.id, e.currentTarget.checked)
            }
            let taskStatus = task.isDone ? 'completeTask' : 'activeTask';

            return (
                <li key={task.id}>
                    {/*<input onChange={onChangeTasksStatusHandler} checked={task.isDone} type="checkbox"/>*/}
                    <SuperInput type={"checkbox"} checked={task.isDone} onChange={onChangeTasksStatusHandler}/>
                    <span className={taskStatus}>{task.title}</span>
                    <SuperButton btnName={'x'} callBack={removeTaskHandler}/>
                </li>
            )
        })

        : 'Нет тасок'

    return (
        <>
            {tasks}
        </>
    );
};

export default TasksList;