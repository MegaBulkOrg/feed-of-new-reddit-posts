import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "./global.css";
import { AppControls } from "./shared/AppControls";
import { CardsList } from "./shared/cards/CardsList";
import { Content } from "./shared/Content";
import { rootReducer } from "./store/store";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

function AppContent() {
  // проверки токена типа !token нет потому что он берется из Redux а там в качестве начального значения указана пустая строка
  // компонент AppControls вынесен за Routes поскольку он должен отображаться на всех "страницах"
  // перенаправление с auth работает но его прямой ссылкой (localhost:3000/auth) его не проверить
  // Route для "sign-in" прописывать не надо: на этой "странице" должен отображаться лишь компонент AppControls а он и так есть
  // Route для "*" (ошибка 404) прописывать не надо: на этой "странице" должен отображаться лишь компонент AppControls а он и так есть
  // однако из-за того что для "sign-in" и "*" в корневом компоненте не прописан роут, в консоли будут возникать предупреждения "No routes matched location" - поэтому введен последний роут который их убирает
  return (
    <BrowserRouter>
      <Content>
        <AppControls />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/auth" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<CardsList />} />
          <Route path="/favorites" element={<CardsList />} />
          <Route path="*" element="" />
        </Routes>
      </Content>
    </BrowserRouter>
  );
}

function AppComponent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return <Provider store={store}>{mounted && <AppContent />}</Provider>;
}

export const App = hot(() => <AppComponent />);
