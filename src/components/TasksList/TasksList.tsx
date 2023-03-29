import React, {ChangeEvent, FC} from 'react';
import {TaskDataType} from "../../App";
import SuperButton from "../SuperButton/SuperButton";
import SuperInput from "../SuperInput/SuperInput";
import EditableSpan from "../EditableSpan/EditableSpan";

type TasksListType = {
    todoListTasks: TaskDataType[]
    removeTask: (todolistId: string,id: string) => void
    changeStatus: (todolistId:string, id: string, isDone: boolean) => void
    todolistId: string
    updateTaskTitle: (title: string, todolistId: string, taskId: string) => void
}
const TasksList: FC<TasksListType> = ({todoListTasks, removeTask, changeStatus, todolistId, updateTaskTitle}) => {

    let tasks = todoListTasks
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
                    {/*<span className={taskStatus}>{task.title}</span>*/}
                    <EditableSpan oldTitle={task.title} callBack={(title: string) => updateTaskTitle(title, todolistId, task.id)}/>
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