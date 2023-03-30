import {combineReducers, createStore} from "redux";
import {TasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";




const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: TasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store =  createStore(rootReducer)
// @ts-ignore
window.store = store
