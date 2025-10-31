import type { CellValue } from '../types/sudoku';

interface SudokuCellProps {
  value: CellValue;
  onChange?: (value: CellValue) => void;
  isError?: boolean;
  isWarning?: boolean;
  isEditable?: boolean;
  isUserInput?: boolean;
  row: number;
  col: number;
}

export const SudokuCell = ({
  value,
  onChange,
  isError = false,
  isWarning = false,
  isEditable = true,
  isUserInput = true,
  row,
  col,
}: SudokuCellProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange || !isEditable) return;

    const newValue = e.target.value;
    if (newValue === '') {
      onChange(null);
    } else {
      const num = parseInt(newValue, 10);
      if (num >= 1 && num <= 9) {
        onChange(num);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([8, 9, 27, 13, 46].includes(e.keyCode)) {
      return;
    }
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      return;
    }
    e.preventDefault();
  };

  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  const isAlternateBox = (boxRow + boxCol) % 2 === 0;

  let bgColor = isAlternateBox ? 'bg-blue-50' : 'bg-white';
  if (isError) {
    bgColor = 'bg-red-200';
  } else if (isWarning) {
    bgColor = 'bg-orange-200';
  }

  const borderClasses = [
    'border-r border-b border-gray-400',
    col % 3 === 2 && col !== 8 ? 'border-r-[3px] border-r-gray-700' : '',
    row % 3 === 2 && row !== 8 ? 'border-b-[3px] border-b-gray-700' : '',
  ].filter(Boolean).join(' ');

  return (
    <input
      type="text"
      maxLength={1}
      value={value ?? ''}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={!isEditable}
      className={`
        block w-full h-full text-center font-semibold text-xl
        focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-inset focus:z-10
        transition-colors duration-200
        ${bgColor}
        ${borderClasses}
        ${isUserInput ? 'text-gray-800' : 'text-gray-500'}
        ${!isEditable ? 'cursor-not-allowed' : 'cursor-text'}
      `}
      style={{
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
      aria-label={`Cell ${row + 1}-${col + 1}`}
    />
  );
};
