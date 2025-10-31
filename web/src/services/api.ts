import type { Board, SudokuSolution } from '../types/sudoku';
import { boardToApiFormat } from '../utils/sudokuUtils';

const API_BASE_URL = 'http://localhost:3000/api/sudoku';

export const solveSudoku = async (board: Board): Promise<SudokuSolution> => {
  const apiBoard = boardToApiFormat(board);

  const response = await fetch(`${API_BASE_URL}/solve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ board: apiBoard }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to solve Sudoku');
  }

  const result: SudokuSolution = await response.json();
  return result;
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
