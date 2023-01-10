export type Record = {
  id: string;
  title: string;
  description?: string;
  caption?: string;
  color?: string;
  createdAt?: string;
  endDate: Date;
};

export type Column = {
  id: string;
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
