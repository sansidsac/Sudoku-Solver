# Sudoku Solver

🌐 **Live Demo**: [https://sudoku-solver-ten-mocha.vercel.app/](https://sudoku-solver-ten-mocha.vercel.app/)

## About This Project

While practicing Data Structures and Algorithms (DSA) on LeetCode, I came across the Sudoku solver problem in the backtracking section. After working through it and successfully solving the problem, I focused on optimizing the algorithm for better performance. Even though I knew building a Sudoku solver web application is quite common, I thought it would be a great opportunity to bring this optimized algorithm to life with a full-stack implementation. This project combines algorithmic problem-solving with practical web development skills.

## Overview

A full-stack Sudoku solver application with an elegant user interface and a powerful solving algorithm. The application finds multiple solutions (up to 10) for any valid Sudoku puzzle using a backtracking algorithm with constraint propagation.

## Features

- **Interactive 9x9 Sudoku Grid**: Enter your puzzle with real-time validation
- **Multiple Solutions**: Finds up to 10 solutions for puzzles with multiple valid answers
- **Real-time Validation**: Orange warnings for duplicate numbers, red errors for invalid states
- **Beautiful UI**: Animated greenery background with particles and swaying trees
- **Solution Display**: View all solutions in a clean 2-column layout
- **Copy to Grid**: Easily copy any solution back to the main grid
- **Auto-scroll**: Automatically scrolls to solutions when found
- **Responsive Design**: Optimized for desktop with mobile support planned

## Technology Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **TypeScript** - Type-safe backend code
- **CORS** - Cross-origin resource sharing
- **Algorithm**: Backtracking with constraint propagation (converted from C++)

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe frontend code
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Spring** - Physics-based animations

## Project Structure

```
Sudoku Solver/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── index.ts        # Express server setup
│   │   ├── routes.ts       # API routes and validation
│   │   └── sudokuSolver.ts # Core solving algorithm
│   ├── package.json
│   └── tsconfig.json
│
└── web/                     # Frontend React application
    ├── src/
    │   ├── components/      # React components
    │   │   ├── AnimatedBackground.tsx
    │   │   ├── LoadingAnimation.tsx
    │   │   ├── SolutionsDisplay.tsx
    │   │   ├── SudokuCell.tsx
    │   │   └── SudokuGrid.tsx
    │   ├── pages/
    │   │   └── SudokuSolverPage.tsx
    │   ├── services/
    │   │   └── api.ts       # API integration
    │   ├── types/
    │   │   └── sudoku.ts    # TypeScript types
    │   ├── utils/
    │   │   └── sudokuUtils.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "Sudoku Solver"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../web
   npm install
   ```

### Running the Application

1. **Start the Backend Server** (in `backend` directory)
   ```bash
   npm start
   ```
   Server runs on: `http://localhost:3000`

2. **Start the Frontend** (in `web` directory, in a new terminal)
   ```bash
   npm run dev
   ```
   Application runs on: `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## API Documentation

### Endpoints

#### POST /api/sudoku/solve
Solves a Sudoku puzzle and returns up to 10 solutions.

**Request Body:**
```json
{
  "board": [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]
}
```
*Note: Use 0 or null for empty cells*

**Response:**
```json
{
  "solved": true,
  "noOfSolutions": 1,
  "solutions": [
    [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      ...
    ]
  ]
}
```

#### GET /api/sudoku/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Sudoku solver API is running"
}
```

## How to Use

1. **Enter Your Puzzle**: Click on any cell in the 9x9 grid and enter numbers 1-9
2. **Real-time Validation**: The app will highlight duplicate numbers in orange (warnings) or red (errors)
3. **Solve**: Click the "Solve" button to find all solutions
4. **View Solutions**: Solutions appear below the main grid (up to 10 solutions shown)
5. **Copy Solution**: Click "Copy to Main Grid" on any solution to view it in the main grid
6. **Clear**: Click "Clear" to reset the grid and start over

## Algorithm Details

The Sudoku solver uses a **backtracking algorithm** with **constraint propagation**:

- **Backtracking**: Systematically tries all possible numbers in empty cells
- **Constraint Propagation**: Tracks used numbers in rows, columns, and 3x3 grids for O(1) validation
- **Early Termination**: Stops after finding 10 solutions to prevent excessive computation
- **Efficient**: Uses boolean arrays instead of repeated grid scanning

### Time Complexity
- Best case: O(1) - Puzzle already solved
- Average case: O(9^m) where m is the number of empty cells
- Worst case: O(9^81) - Empty grid (limited to finding 10 solutions)

## Color Scheme

- **Primary**: Dark Green (#1a4d2e)
- **Grid**: Alternating blue-white pattern for 3x3 boxes
- **Warnings**: Orange for duplicate numbers
- **Errors**: Red for invalid states
- **Background**: Gradient with greenery theme

## Development Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run build` - Compile TypeScript to JavaScript

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Author

Built with ❤️ using React, TypeScript, and Node.js
