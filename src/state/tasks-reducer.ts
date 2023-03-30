import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

type ActionsType =
    ReturnType<typeof RemoveTaskAC> |
    ReturnType<typeof AddTaskAC> |
    ReturnType<typeof ChangeStatusAC> |
    ReturnType<typeof UpdateTaskTitleAC> |
    AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
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
}
export const TasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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
        case "ADD_TODOLIST":
            return {
                ...state,
                [action.todolistId] : []
            }
        case "REMOVE-TODOLIST":
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default :
            return state
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