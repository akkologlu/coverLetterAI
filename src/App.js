import React from "react";
import Generate from "./components/Generate";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </div>
  );
}

export default App;
