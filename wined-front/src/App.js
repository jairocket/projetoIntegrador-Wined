
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/login'
import SignUp from './pages/signUp'
import Dashboard from './pages/dashboard';

// import Teste from './components/Teste';
// import Footer from './components/Footer';
// import UnloggedHeader from './components/UnloggedHeader';
// import Header from './components/Header';
// import logo from './logo.svg';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login'>
          <Login/>        
        </Route>
        <Route exact path='/signup'>
          <SignUp/>
        </Route>
        <Route exact path='/dashboard'>
          <Dashboard/>
          
        </Route> 
        <Route exact path='/'>
          
        </Route>


        <Route exact path='/404'>
          
        </Route>

        <Redirect to='/404' /> 

      </Switch>    
    </BrowserRouter>
    
    // <div className="App">
    //   <UnloggedHeader />
    //   <Header />
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <Teste />
    //   <Footer />
    // </div>
    
  );
}

export default App;
