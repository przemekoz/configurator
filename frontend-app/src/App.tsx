import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { Lamps } from "./pages/Lamps/Lamps";
import { Crowns } from "./pages/Crowns/Crowns";
import { Columns } from "./pages/Columns/Columns";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="lamps" element={<Lamps />} />
        <Route path="crowns" element={<Crowns />} />
        <Route path="columns" element={<Columns />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
