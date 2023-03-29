import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionsType =
    ReturnType<typeof RemoveTaskAC> |
    ReturnType<typeof AddTaskAC> |
    ReturnType<typeof ChangeStatusAC> |
    ReturnType<typeof UpdateTaskTitleAC> |
    ReturnType<typeof AddNewTasksArrayAC>

export const TasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id)
            }
        }
        case "ADD_TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.id ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case "UPDATE_TASK_TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    id: action.payload.id,
                    title: action.payload.title
                } : el)
            }
        }
        case "ADD_NEW_TASKS_ARRAY": {
            return {
                ...state,
                [action.payload.todolistId] : []
            }
        }
        default :
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTaskAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            id
        }
    } as const
}
export const AddTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}
export const ChangeStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            id,
            isDone
        }
    } as const
}
export const UpdateTaskTitleAC = (todolistId: string, title: string, id: string) => {
    return {
        type: 'UPDATE_TASK_TITLE',
        payload: {
            todolistId,
            title,
            id
        }
    } as const
}
export const AddNewTasksArrayAC = (todolistId: string) => {
    return {
        type: 'ADD_NEW_TASKS_ARRAY',
        payload: {
            todolistId
        }
    } as const
}