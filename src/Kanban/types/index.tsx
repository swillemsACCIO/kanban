export type Record = {
  id: string;
  column_id: string;
  pos: number;
  title: string;
  description?: string;
  caption?: string;
  color?: string;
  createdAt?: string;
  endDate: Date;
};

export type Column = {
  id: string;
  board_id: string;
  pos: number;
  title: string;
  description?: string;
  caption?: string;
  color?: string;
  records?: Record[];
  wipLimit?: number;
  wipEnabled?: boolean;
  createdAt?: string;
  endDate: Date;
};

export type Board = {
  id: string;
  title: string;
  description?: string;
  caption?: string;
  columns?: Column[];
  createdAt?: string;
};

export type BoardData = {
  BoardOwnerID: number;
  BoardOwnerName: string;
  boards?: Board[];
};