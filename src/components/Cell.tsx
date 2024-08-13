import React, { useContext, useState } from 'react';
import { MatrixContext } from '../context/MatrixContext';
import { Cell as CellType } from '../types/cell';

interface CellProps {
  cell: CellType;
  rowIndex: number;
  colIndex: number;
}

const Cell: React.FC<CellProps> = ({ cell, rowIndex, colIndex }) => {
  const { matrix, setMatrix } = useContext(MatrixContext);
  const [highlighted, setHighlighted] = useState(false);

  const handleClick = () => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex].amount += 1;
    setMatrix(newMatrix);
  };

  const handleMouseEnter = () => {
    const distances = matrix.flatMap(row =>
      row.map(c => ({
        cell: c,
        distance: Math.abs(c.amount - cell.amount),
      }))
    );
    distances.sort((a, b) => a.distance - b.distance);
    const closestCells = distances.slice(0, 5).map(d => d.cell.id);

    const newMatrix = matrix.map(row =>
      row.map(c => ({
        ...c,
        highlighted: closestCells.includes(c.id),
      }))
    );

    setHighlighted(true);
    setMatrix(newMatrix);
  };

  const handleMouseLeave = () => {
    const newMatrix = matrix.map(row =>
      row.map(c => ({
        ...c,
        highlighted: false,
      }))
    );

    setMatrix(newMatrix);
  };

  return (
    <div
      className={`matrix-cell ${highlighted ? 'highlighted' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cell.amount}
    </div>
  );
};

export default Cell;
