import "./App.css";
import { Routes, Route } from "react-router-dom";
import Article from "./pages/Article";
import Space from "./pages/Space";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Article />}></Route>
        <Route path="/space" element={<Space />}></Route>
      </Routes>
    </div>
  );
}

export default App;
