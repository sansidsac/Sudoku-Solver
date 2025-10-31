import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Board, ValidationError, SudokuSolution } from '../types/sudoku';
import {
  createEmptyBoard,
  findValidationErrors,
  isBoardEmpty,
  copyBoard,
} from '../utils/sudokuUtils';
import { solveSudoku } from '../services/api';
import { SudokuGrid } from '../components/SudokuGrid';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { SolutionsDisplay } from '../components/SolutionsDisplay';

export const SudokuSolverPage = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [userInputBoard, setUserInputBoard] = useState<Board>(createEmptyBoard());
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [warnings, setWarnings] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SudokuSolution | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const solutionsRef = useRef<HTMLDivElement>(null);

  const handleCellChange = (row: number, col: number, value: number | null) => {
    const newBoard = copyBoard(board);
    newBoard[row][col] = value;
    setBoard(newBoard);

    const newUserInputBoard = copyBoard(userInputBoard);
    newUserInputBoard[row][col] = value;
    setUserInputBoard(newUserInputBoard);

    const validationErrors = findValidationErrors(newBoard);
    setWarnings(validationErrors);
    
    setResult(null);
    setErrors([]);
    setErrorMessage('');
  };

  const handleClear = () => {
    setBoard(createEmptyBoard());
    setUserInputBoard(createEmptyBoard());
    setErrors([]);
    setWarnings([]);
    setResult(null);
    setErrorMessage('');
  };

  const handleSolve = async () => {
    const validationErrors = findValidationErrors(board);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setErrorMessage('Please fix the errors (red cells) before solving');
      return;
    }

    if (isBoardEmpty(board)) {
      setErrorMessage('Please enter at least one number');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setErrors([]);
    setWarnings([]);

    try {
      const solution = await solveSudoku(board);
      setResult(solution);

      if (!solution.solved) {
        setErrorMessage('No solutions can be formed for this Sudoku');
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to solve Sudoku. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (result && result.solved && result.solutions.length > 0 && solutionsRef.current) {
      setTimeout(() => {
        solutionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [result]);

  const handleCopySolution = (solution: Board) => {
    setBoard(copyBoard(solution));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-6 px-4 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
          style={{ marginTop: '12px', marginBottom: '24px' }}
        >
          <h1 className="text-5xl font-bold text-[#1a4d2e]" >
            Sudoku Solver
          </h1>
          <p className="text-l text-gray-700">
            Enter your puzzle and let the algorithm find all solutions
          </p>
        </motion.div>

        <div className="flex flex-col items-center w-full mb-6">
          <div>
            <SudokuGrid
              board={board}
              onCellChange={handleCellChange}
              errors={errors}
              warnings={warnings}
              isEditable={!isLoading}
              userInputBoard={userInputBoard}
              size="large"
            />
          </div>

          <div className="h-6 flex items-center justify-center w-full mb-4">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md text-center px-6 py-3 text-red-700 rounded-lg text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            {warnings.length > 0 && errors.length === 0 && !errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md text-center px-6 py-3 text-orange-700 rounded-lg text-sm"
              >
                Warning: Duplicate numbers detected (orange cells)
              </motion.div>
            )}
          </div>

          <div className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSolve}
              disabled={isLoading}
              style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '10px', paddingBottom: '10px' }}
              className={`
                rounded-xl font-semibold text-lg shadow-xl
                transition-all duration-200
                ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#1a4d2e] text-white hover:opacity-90'
                }
              `}
            >
              {isLoading ? 'Solving...' : 'Solve'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              disabled={isLoading}
              style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '10px', paddingBottom: '10px' }}
              className={`
                rounded-xl font-semibold text-lg shadow-xl
                border-2 transition-all duration-200
                ${
                  isLoading
                    ? 'bg-gray-200 border-gray-400 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-[#1a4d2e] text-[#1a4d2e] hover:bg-gray-50'
                }
              `}
            >
              Clear
            </motion.button>
          </div>
        </div>

        {isLoading && <LoadingAnimation />}

        {result && result.solved && result.solutions.length > 0 && (
          <div ref={solutionsRef} style={{ marginTop: '120px', marginBottom: '80px' }}>
            <SolutionsDisplay
              solutions={result.solutions}
              noOfSolutions={result.noOfSolutions}
              onCopySolution={handleCopySolution}
            />
          </div>
        )}
      </div>
    </div>
  );
};
