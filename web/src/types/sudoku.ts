export type CellValue = number | null;
export type Board = CellValue[][];

export interface SudokuSolution {
  solved: boolean;
  noOfSolutions: number;
  solutions: Board[];
}

export interface ValidationError {
  row: number;
  col: number;
  type: 'duplicate';
}

export type CellState = 'valid' | 'warning' | 'error' | 'empty';
