import { Routes, Route } from "react-router-dom";
import * as components from "./views/views.js";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<components.Welcome />} />
        <Route path="/home" element={<components.Home />} />
        <Route path="/detail/:id" element={<components.Detail />} />
      </Routes>
    </>
  );
}

export default App;
