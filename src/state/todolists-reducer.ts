import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    } as const
}
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    } as const
}
export const ChangeTodolistFilterAC = (filter: FilterType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    } as const
}
