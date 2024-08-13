import { Cell, Matrix } from '../types/cell';

export const generateMatrixData = (rows: number, cols: number): Matrix => {
  const matrix: Matrix = [];
  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        id: `${i}-${j}`,
        amount: Math.floor(Math.random() * 900) + 100,
      });
    }
    matrix.push(row);
  }
  return matrix;
};

export const calculateRowSum = (row: Cell[]): number => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

export const calculateColumnAverage = (matrix: Matrix, colIndex: number): number => {
  const sum = matrix.reduce((total, row) => total + row[colIndex].amount, 0);
  return sum / matrix.length;
};
