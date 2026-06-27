import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import GamePage from './pages/GamePage/GamePage.jsx';
import ResultPage from './pages/ResultPage/ResultPage.jsx';

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:scenarioId" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </GameProvider>
  );
}
