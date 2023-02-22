import React, {ChangeEvent, FC} from 'react';
import {TaskDataType} from "../../App";
import SuperButton from "../SuperButton/SuperButton";

type TasksList = {
    todoListTasks: TaskDataType[]
    removeTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}
const TasksList: FC<TasksList> = ({todoListTasks, removeTask, changeStatus}) => {

    let tasks = todoListTasks.length
        ? todoListTasks.map((task) => {

            const removeTaskHandler = () => removeTask(task.id)
            const onChangeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeStatus(task.id, e.currentTarget.checked)
            }
            let taskStatus = task.isDone ? 'completeTask' : 'activeTask';

            return (
                <li key={task.id}>
                    <input onChange={onChangeTasksStatusHandler} checked={task.isDone} type="checkbox"/>
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