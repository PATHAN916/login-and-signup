import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>

     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
