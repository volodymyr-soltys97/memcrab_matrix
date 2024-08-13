export type CellId = string;

export type CellValue = number;

export type Cell = {
  id: CellId;
  amount: CellValue;
  isPercentage?: boolean;
};

export type Matrix = Cell[][];
