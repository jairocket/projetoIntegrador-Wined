import logo from './logo.svg';
import './App.css';
import Teste from './components/Teste';
import Footer from './components/Footer';
import UnloggedHeader from './components/UnloggedHeader';
import Header from './components/Header';

function App() {
  return (
    
    <div className="App">
      <UnloggedHeader />
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Teste />
      <Footer />
    </div>
    
  );
}

export default App;
