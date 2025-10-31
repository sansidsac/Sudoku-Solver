import { motion } from 'framer-motion';
import type { Board } from '../types/sudoku';
import { SudokuGrid } from './SudokuGrid';
import { copyBoard } from '../utils/sudokuUtils';

interface SolutionsDisplayProps {
  solutions: Board[];
  noOfSolutions: number;
  onCopySolution: (solution: Board) => void;
}

export const SolutionsDisplay = ({
  solutions,
  noOfSolutions,
  onCopySolution,
}: SolutionsDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mt-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#1a4d2e]">
          {noOfSolutions >= 10 ? 'Many solutions found!' : `${noOfSolutions} Solution${noOfSolutions > 1 ? 's' : ''} Found`}
        </h2>
        <p className="text-l text-gray-700">
          {noOfSolutions >= 10
            ? 'Showing first 10 solutions'
            : noOfSolutions > 1
            ? 'Click "Copy to Main Grid" to use any solution'
            : 'Click "Copy to Main Grid" to see the solution in the main grid'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 justify-items-center">
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Solution {index + 1}
            </h3>
            <SudokuGrid
              board={solution}
              isEditable={false}
              size="small"
              showCopyButton={true}
              onCopy={() => onCopySolution(copyBoard(solution))}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
