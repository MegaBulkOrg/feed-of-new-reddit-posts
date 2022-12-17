import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";

export const SET_TOKEN = 'SET_TOKEN'

export type SetTokenAction = {
    type: typeof SET_TOKEN
    token?: string
}

export const setToken: ActionCreator<SetTokenAction> = (token) => ({
    type: SET_TOKEN,
    token
})

export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch) => {
    const token = localStorage.getItem('token')
    if (token && token != 'undefined') dispatch(setToken(token))
} 