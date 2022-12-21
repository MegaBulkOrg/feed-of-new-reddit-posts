import { Reducer } from "redux"
import { DATA_DELETE_ITEM, DATA_LIKE_ITEM, DATA_REQUEST, DATA_REQUEST_ERROR, DATA_REQUEST_SUCCESS } from "./data"
import { dataReducer, DataState } from "./dataReducer"

export type RootState = {
  items: DataState
}

const initialState: RootState = {
  items: {loading: false, error: '', data: []}
}

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
    switch (action.type) {      
      case DATA_REQUEST:
      case DATA_REQUEST_ERROR: 
      case DATA_REQUEST_SUCCESS:
      case DATA_DELETE_ITEM:
      case DATA_LIKE_ITEM: 
        return {...state, items: dataReducer(state.items, action)}
      default:
          return state
  }
}