import React from 'react';
import { MatrixProvider } from './context/MatrixContext';
import Matrix from './components/Matrix';
import './App.css';

const App: React.FC = () => {
  return (
    <MatrixProvider>
      <Matrix />
    </MatrixProvider>
  );
};

export default App;
