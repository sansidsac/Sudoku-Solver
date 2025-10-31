import express, { Request, Response } from 'express';
import cors from 'cors';
import sudokuRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/sudoku', sudokuRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Sudoku Solver API',
        endpoints: {
            solve: 'POST /api/sudoku/solve',
            health: 'GET /api/sudoku/health'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
