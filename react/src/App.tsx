import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Login } from "./Pages/Login";
// import SignUp from "./pages/signUp";
// import Dashboard from "./pages/dashboard";
// import Brotherhood from "./pages/brotherhood";
// import RouteWrapper from "./routes/RouteWrapper";

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
        {/* <Route exact path="/signup">
          <SignUp />
        </Route>
        <RouteWrapper
          exact
          path="/dashboard"
          isPrivate
          component={() => <Dashboard />}
        ></RouteWrapper>
        <Route exact path="/brotherhood/:id">
          <Brotherhood />
        </Route> */}

        <Route path="/"></Route>
        <Route path="/404"></Route>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
