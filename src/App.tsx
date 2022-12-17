import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import './App.css';
import { AppControls } from "./shared/AppControls";
import { CardsList } from "./shared/cards/CardsList";
import { Content } from "./shared/Content";
import { rootReducer, RootState } from "./store/store";
import { saveToken } from "./store/token";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

function AppContent() {
  const token = useSelector<RootState, string>((state) => state.token)
  const dispatch = useDispatch<any>()
  useEffect(() => {dispatch(saveToken())}, [token])
  
  return (       
    <Content>
      <AppControls />
      <CardsList />
    </Content>
  )
}

function AppComponent() {
  return (
    <Provider store={store}>
      <AppContent/>
    </Provider>
  )
}

export const App = hot(() => <AppComponent />);