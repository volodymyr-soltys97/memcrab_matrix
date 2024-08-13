import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { generateMatrixData } from '../utils/matrixUtils';
import { Matrix } from '../types/cell';

interface MatrixContextProps {
  matrix: Matrix;
  originalMatrix: Matrix;
  generateMatrix: (rows: number, cols: number) => void;
  setMatrix: (newMatrix: Matrix) => void;
}

export const MatrixContext = createContext<MatrixContextProps>({
  matrix: [],
  originalMatrix: [],
  generateMatrix: () => {},
  setMatrix: () => {},
});

export const MatrixProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matrix, setMatrixState] = useState<Matrix>([]);
  const [originalMatrix, setOriginalMatrix] = useState<Matrix>([]);

  const generateMatrix = (rows: number, cols: number) => {
    const newMatrix = generateMatrixData(rows, cols);
    setMatrixState(newMatrix);
    setOriginalMatrix(newMatrix);
  };

  const setMatrix = (newMatrix: Matrix) => {
    setMatrixState(newMatrix);
  };

  useEffect(() => {
    generateMatrix(2, 2);
  }, [])

  return (
    <MatrixContext.Provider value={{ matrix, originalMatrix, generateMatrix, setMatrix }}>
      {children}
    </MatrixContext.Provider>
  );
};

