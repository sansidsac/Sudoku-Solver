import { motion } from 'framer-motion';
import type { Board, ValidationError } from '../types/sudoku';
import { SudokuCell } from './SudokuCell';

interface SudokuGridProps {
  board: Board;
  onCellChange?: (row: number, col: number, value: number | null) => void;
  errors?: ValidationError[];
  warnings?: ValidationError[];
  isEditable?: boolean;
  userInputBoard?: Board; // To track which cells were user input
  size?: 'large' | 'small';
  showCopyButton?: boolean;
  onCopy?: () => void;
}

export const SudokuGrid = ({
  board,
  onCellChange,
  errors = [],
  warnings = [],
  isEditable = true,
  userInputBoard,
  size = 'large',
  showCopyButton = false,
  onCopy,
}: SudokuGridProps) => {
  const handleCellChange = (row: number, col: number, value: number | null) => {
    if (onCellChange) {
      onCellChange(row, col, value);
    }
  };

  const isError = (row: number, col: number) => {
    return errors.some(err => err.row === row && err.col === col);
  };

  const isWarning = (row: number, col: number) => {
    return warnings.some(warn => warn.row === row && warn.col === col);
  };

  const isUserInput = (row: number, col: number) => {
    if (!userInputBoard) return true;
    return userInputBoard[row][col] !== null;
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center w-full"
    >
      <div
        className={`
          ${size === 'large' ? 'w-full max-w-[540px]' : 'w-[270px]'}
          border-t-[3px] border-l-[3px] border-r-[3px] border-b-[3px] border-gray-700 rounded-lg overflow-hidden
          shadow-xl bg-white
        `}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(9, 1fr)`,
          gridTemplateRows: `repeat(9, 1fr)`,
          aspectRatio: '1 / 1',
          gap: 0,
          padding: 0,
          margin: 0,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
              }}
            >
              <SudokuCell
                value={cell}
                onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                isError={isError(rowIndex, colIndex)}
                isWarning={isWarning(rowIndex, colIndex)}
                isEditable={isEditable}
                isUserInput={isUserInput(rowIndex, colIndex)}
                row={rowIndex}
                col={colIndex}
              />
            </div>
          ))
        )}
      </div>

      {showCopyButton && (
        <button
          onClick={onCopy}
          style={{ paddingLeft: '12px', paddingRight: '12px', paddingTop: '8px', paddingBottom: '8px', marginTop: '16px' }}
          className="mt-4 text-sm font-semibold text-white bg-[#1a4d2e] rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          Copy to Main Grid
        </button>
      )}
    </motion.div>
  );
};
