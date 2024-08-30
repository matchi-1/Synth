import "./App.css";
import { Routes, Route } from "react-router-dom";
import Page from "./pages/Page";
import Space from "./pages/Space";
console.log(process.env.REACT_APP_KAHIT_ANO);
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Page />}></Route>
        <Route path="/space" element={<Space />}></Route>
      </Routes>
    </div>
  );
}

export default App;
