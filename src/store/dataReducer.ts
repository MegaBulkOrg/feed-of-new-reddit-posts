import { Reducer } from "react"
import { ICardProps } from "../shared/cards/Card"

import { DataDeleteItemAction, DataLikeItemAction, DataRequestAction, DataRequestErrorAction, DataRequestSuccessAction, DATA_DELETE_ITEM, DATA_LIKE_ITEM, DATA_REQUEST, DATA_REQUEST_ERROR, DATA_REQUEST_SUCCESS } from "./data"

export type DataState = {
    loading: boolean
    error: string
    data: ICardProps[]
}

interface ICart {
    [K: string]: any
}

type DataActions = DataRequestAction | DataRequestSuccessAction | DataRequestErrorAction | DataDeleteItemAction | DataLikeItemAction

export const dataReducer: Reducer<DataState, DataActions> = (state, action) => {
    switch (action.type) {
        case DATA_REQUEST:
            return {...state, loading: true}
        case DATA_REQUEST_ERROR: 
            return {...state, error: action.error, loading: false}
        case DATA_REQUEST_SUCCESS: 
            return {...state, data: action.data, loading: false}
        case DATA_DELETE_ITEM: 
            const reducedData = state.data.filter((card: ICart) => card.id !== action.id)
            return {...state, data: reducedData}
        case DATA_LIKE_ITEM:
            // просто использовать тут метод find не получится поскольку TypeScript ругается
            // на то что метод find возвратит объект с типом ICardProps | undefined а тут нужно только ICardProps
            const arrayWithLikedItem = state.data.filter((card: ICart) => card.id === action.id)
            const likedData = state.data.map(
                (item) => item.id === action.id ? {...arrayWithLikedItem[0], liked: action.liked} : item
            )
            return {...state, data: likedData}
        default:
            return state
    }
}