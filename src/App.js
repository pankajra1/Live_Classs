import {Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import GameBoard from './components/GameBoard';
import Duel from './components/duel';
import { GameProvider } from './contexts/gamecontext';

function App() {
  return (
    <div className="App">
      <GameProvider>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/GameBoard/:roomId' element={<GameBoard/>}></Route>
          <Route path='/Duel' element={<Duel/>}></Route>
          </Routes>
      </GameProvider>
    </div>
  );
}

export default App;
