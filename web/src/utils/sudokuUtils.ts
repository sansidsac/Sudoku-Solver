import type { Board, CellValue, ValidationError } from '../types/sudoku';

export const createEmptyBoard = (): Board => {
  return Array(9).fill(null).map(() => Array(9).fill(null));
};

export const boardToApiFormat = (board: Board): number[][] => {
  return board.map(row => row.map(cell => cell ?? 0));
};

export const apiBoardToFormat = (board: number[][]): Board => {
  return board.map(row => row.map(cell => cell === 0 ? null : cell));
};

export const validateCell = (
  board: Board,
  row: number,
  col: number,
  value: CellValue
): boolean => {
  if (value === null) return true;

  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c] === value) return false;
  }

  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col] === value) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (r !== row && c !== col && board[r][c] === value) {
        return false;
      }
    }
  }

  return true;
};

export const findValidationErrors = (board: Board): ValidationError[] => {
  const errors: ValidationError[] = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      if (value !== null && !validateCell(board, row, col, value)) {
        errors.push({ row, col, type: 'duplicate' });
      }
    }
  }

  return errors;
};

export const isBoardEmpty = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell === null));
};

export const isBoardFilled = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const copyBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};
