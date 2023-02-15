import {Hangman} from './components/Hangman'
import {Header} from './components/Header'
import { Footer } from './components/Footer';
import './App.css';

// Returns the main app with the main components
function App() {
  return (
    <div className="App">
      <Header />
      <Hangman />
      <Footer />
    </div>
  );
}

export default App;
