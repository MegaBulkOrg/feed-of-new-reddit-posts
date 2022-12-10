import { Reducer } from "redux"
import { DATA_DELETE_ITEM, DATA_LIKE_ITEM, DATA_REQUEST, DATA_REQUEST_ERROR, DATA_REQUEST_SUCCESS } from "./data"
import { dataReducer, DataState } from "./dataReducer"
import { CHANGE_MODE } from "./mode"
import { SET_TOKEN } from "./token"

export type RootState = {
  token: string
  items: DataState
  mode: string
}

const initialState: RootState = {
  token: '',
  items: {loading: false, error: '', data: []},
  mode: ''
}

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
    switch (action.type) {      
      case SET_TOKEN:
        return {...state, token: action.token};
      case DATA_REQUEST:
      case DATA_REQUEST_ERROR: 
      case DATA_REQUEST_SUCCESS:
      case DATA_DELETE_ITEM:
      case DATA_LIKE_ITEM: 
        return {...state, items: dataReducer(state.items, action)}
      case CHANGE_MODE:
        return {...state, mode: action.mode}
      default:
          return state
  }
}