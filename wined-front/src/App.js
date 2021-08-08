import logo from './logo.svg';
import './App.css';
import Teste from './components/Teste';
import Footer from './components/Footer';
import Header from './components/UnloggedHeader';

function App() {
  return (
    
    <div className="App">
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
