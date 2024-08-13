import React, { useContext } from 'react';
import { MatrixContext } from '../context/MatrixContext';
import { calculateRowSum, calculateColumnAverage, generateMatrixData } from '../utils/matrixUtils';

const Matrix: React.FC = () => {
  const { matrix, setMatrix, originalMatrix } = useContext(MatrixContext);

  if (!matrix || matrix.length === 0) return <p>No matrix</p>;

  const rowSums = matrix.map(row => calculateRowSum(row));
  const colAverages = matrix[0]?.map((_, colIndex) => calculateColumnAverage(matrix, colIndex));

  const handleSumMouseEnter = (rowIndex: number) => {
    const sum = rowSums[rowIndex];
    const newMatrix = matrix.map((row, rIndex) =>
      row.map((c, cIndex) => {
        if (rIndex === rowIndex) {
          return {
            ...c,
            amount: (c.amount / sum) * 100,
            isPercentage: true,
          };
        }
        return c;
      })
    );
    setMatrix(newMatrix);
  };

  const handleSumMouseLeave = (rowIndex: number) => {
    setMatrix(originalMatrix);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newMatrix = matrix.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return {
            ...cell,
            amount: cell.amount + 1,
          };
        }
        return cell;
      })
    );

    setMatrix(newMatrix);
  };

  const handleAddRow = () => {
    const newRow = generateMatrixData(1, matrix[0].length)[0];
    const newMatrix = [...matrix, newRow];
    setMatrix(newMatrix);
  };

  const handleRemoveRow = (rowIndex: number) => {
    const newMatrix = matrix.filter((_, index) => index !== rowIndex);
    setMatrix(newMatrix);
  };

  return (
    <div className='matrix-container'>
      <div className='matrix'>
        <div className='matrix-row'>
          <div className='matrix-cell header-cell'></div>
          {matrix[0].map((_, colIndex) => (
            <div key={`header-${colIndex}`} className='matrix-cell header-cell'>
              Cell values N={colIndex + 1}
            </div>
          ))}
          <div className='matrix-cell header-cell'>Sum values</div>
        </div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className='matrix-row'>
            <div className='matrix-cell header-cell'>
              Cell Value M={rowIndex + 1}
              <button className='remove-row-btn' onClick={() => handleRemoveRow(rowIndex)}>Remove Row</button>
            </div>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`matrix-cell ${cell.isPercentage ? 'percentage-cell' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell.isPercentage ? `${cell.amount.toFixed(2)}%` : cell.amount}
              </div>
            ))}
            <div
              className='matrix-cell sum-cell'
              onMouseEnter={() => handleSumMouseEnter(rowIndex)}
              onMouseLeave={() => handleSumMouseLeave(rowIndex)}
            >
              {rowSums[rowIndex].toFixed(0)}
            </div>
          </div>
        ))}
        <div className='matrix-row average-row'>
          <div className='matrix-cell header-cell'>Average values</div>
          {colAverages?.map((avg, index) => (
            <div key={index} className='matrix-cell average-cell'>{avg.toFixed(2)}</div>
          ))}
          <div className='matrix-cell sum-cell'></div>
        </div>
      </div>
      <button className='add-row-btn' onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default Matrix;
