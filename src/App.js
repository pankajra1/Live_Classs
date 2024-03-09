import {Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/GameBoard/:roomId' element={<GameBoard/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
