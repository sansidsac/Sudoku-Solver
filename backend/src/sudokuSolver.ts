type Board = number[][];
type CellValue = number | null;

interface SolverState {
    rows: boolean[][];
    cols: boolean[][];
    grid: boolean[][];
}

export interface SudokuSolution {
    solved: boolean;
    noOfSolutions: number;
    solutions: Board[];
}

export class SudokuSolver {
    private solutions: Board[] = [];
    private maxSolutions: number = 10;

    solve(board: Board): SudokuSolution {
        this.solutions = [];
        const workingBoard = board.map(row => [...row]);
        const rows: boolean[][] = Array(9).fill(null).map(() => Array(10).fill(false));
        const cols: boolean[][] = Array(9).fill(null).map(() => Array(10).fill(false));
        const grid: boolean[][] = Array(9).fill(null).map(() => Array(10).fill(false));

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const value = workingBoard[i][j];
                if (value !== 0 && value !== null) {
                    rows[i][value] = true;
                    cols[j][value] = true;
                    const gridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                    grid[gridIndex][value] = true;
                }
            }
        }

        this.fill(workingBoard, 0, 0, { rows, cols, grid });

        return {
            solved: this.solutions.length > 0,
            noOfSolutions: this.solutions.length,
            solutions: this.solutions
        };
    }

    private isValid(
        board: Board,
        r: number,
        c: number,
        state: SolverState
    ): boolean {
        const value = board[r][c];
        const gridN = Math.floor(r / 3) * 3 + Math.floor(c / 3);

        if (state.rows[r][value]) return false;
        if (state.cols[c][value]) return false;
        if (state.grid[gridN][value]) return false;

        state.rows[r][value] = true;
        state.cols[c][value] = true;
        state.grid[gridN][value] = true;

        return true;
    }

    private fill(
        board: Board,
        r: number,
        c: number,
        state: SolverState
    ): void {
        if (this.solutions.length >= this.maxSolutions) {
            return;
        }

        for (let i = r; i < 9; i++) {
            for (let j = c; j < 9; j++) {
                if (board[i][j] !== 0 && board[i][j] !== null) continue;

                for (let k = 1; k <= 9; k++) {
                    board[i][j] = k;

                    if (this.isValid(board, i, j, state)) {
                        if (j === 8) {
                            this.fill(board, i + 1, 0, state);
                        } else {
                            this.fill(board, i, j + 1, state);
                        }

                        state.rows[i][board[i][j]] = false;
                        state.cols[j][board[i][j]] = false;
                        const gridN = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                        state.grid[gridN][board[i][j]] = false;
                    }

                    board[i][j] = 0;
                }
                return;
            }
            c = 0;
        }

        this.solutions.push(board.map(row => [...row]));
    }
}
