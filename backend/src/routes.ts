import { Router, Request, Response } from 'express';
import { SudokuSolver } from './sudokuSolver';

const router = Router();
const solver = new SudokuSolver();

router.post('/solve', (req: Request, res: Response) => {
    try {
        const { board } = req.body;

        if (!board || !Array.isArray(board)) {
            return res.status(400).json({
                error: 'Invalid input: board must be a 2D array'
            });
        }

        if (board.length !== 9 || !board.every(row => Array.isArray(row) && row.length === 9)) {
            return res.status(400).json({
                error: 'Invalid board: must be 9x9 grid'
            });
        }

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const value = board[i][j];
                if (value !== null && value !== 0 && (value < 1 || value > 9 || !Number.isInteger(value))) {
                    return res.status(400).json({
                        error: 'Invalid board values: must be integers 0-9 or null'
                    });
                }
            }
        }

        const result = solver.solve(board);
        res.json(result);
    } catch (error) {
        console.error('Error solving sudoku:', error);
        res.status(500).json({
            error: 'Internal server error while solving sudoku'
        });
    }
});

router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Sudoku solver API is running' });
});

export default router;
