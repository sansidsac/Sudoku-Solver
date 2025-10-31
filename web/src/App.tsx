import { AnimatedBackground } from './components/AnimatedBackground';
import { SudokuSolverPage } from './pages/SudokuSolverPage';

const App = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <SudokuSolverPage />
    </div>
  );
};

export default App;