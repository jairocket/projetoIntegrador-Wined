import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";

import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import { Brotherhood } from "./Pages/Brotherhood";

// import Teste from './components/Teste';
// import Footer from './components/Footer';
// import UnloggedHeader from './components/UnloggedHeader';
// import Header from './components/Header';
// import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Brotherhood />} path="/brotherhood/:id" />
        </Route>
        <Route path="/"></Route>
        <Route path="/404"></Route>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
