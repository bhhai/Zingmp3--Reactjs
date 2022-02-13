import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LeftBar from "./components/LeftBar/LeftBar";
import Home from "./feature/Home/Home";
function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="content__left">
          <LeftBar />
        </div>
        <div className="right">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
