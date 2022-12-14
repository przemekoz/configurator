import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { Lamps } from "./pages/Lamps/Lamps";
import { Crowns } from "./pages/Crowns/Crowns";
import { Columns } from "./pages/Columns/Columns";
import { Provider } from "react-redux";
import { store } from "./app-store";
import "./App.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/lamps" />} />
        <Route path="/" element={<Home />}>
          <Route path="lamps" element={<Lamps />} />
          <Route path="crowns" element={<Crowns />} />
          <Route path="columns" element={<Columns />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
