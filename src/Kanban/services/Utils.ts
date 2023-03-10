import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { Board, Column, Record } from "Kanban/types";

export const getId = (): string => {
  return uuidv4();
};

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getCreatedAt = () => {
  return `${moment().format("DD-MM-YYYY")} ${moment().format("h:mm:ss a")}`;
};

export const getEndDate = (records: Record[]) => {
  let maxEndDate: Date = new Date(2000,1,1);
  if (records){
    records.forEach(rec => {
      let actDate = new Date(rec.endDate);
      if (actDate>maxEndDate) maxEndDate= actDate;
    });    
  }

  return maxEndDate;
};

export const reorderCards = ({
  columns,
  sourceColumn,
  destinationColumn,
  sourceIndex,
  destinationIndex,
}: {
  columns: Column[];
  sourceColumn: Column;
  destinationColumn: Column;
  sourceIndex: number;
  destinationIndex: number;
}) => {
  const getColumnIndex = (columnId: string) =>
    columns.findIndex((c) => c.id === columnId);

  const getRecords = (columnId: string) => [
    ...columns.find((c) => c.id === columnId)?.records!,
  ];

  const current = getRecords(sourceColumn.id);
  const next = getRecords(destinationColumn.id);
  const target = current[sourceIndex];

  // moving to same list
  if (sourceColumn.id === destinationColumn.id) {
    const reordered = reorder(current, sourceIndex, destinationIndex);
    reordered.forEach((col, _index) => {
      col.index = _index;
    });
    const newColumns = columns.map((c) => ({ ...c }));
    newColumns[getColumnIndex(sourceColumn.id)].records = reordered;
    return newColumns;
  }

  // moving to different list
  current.splice(sourceIndex, 1);
  next.splice(destinationIndex, 0, target);
  const newColumns = columns.map((c) => ({ ...c }));
  newColumns[getColumnIndex(sourceColumn.id)].records = current;
  newColumns[getColumnIndex(destinationColumn.id)].records = next;
  newColumns.forEach((col, _index) => {
    col.pos = _index;
    col.records!.forEach((rec, _index) => {
      rec.column_id = col.id;
      rec.pos = _index;
    });
  });

  return newColumns;
};

export const getInitialColumnState = (board_id: string) => {

  let resArr =[
    {
      id: getId(),
      board_id: board_id,
      pos: 0,
      title: "Todo",
      color: "Orange",
      records: [
        {
          id: getId(),
          column_id: "x",
          pos: 0,
          color: "Yellow",
          title: "Clear Board",
          description:
            "Make a fresh start by erasing this board. Click delete button on main toolbar.",
          createdAt: getCreatedAt(),
          endDate: new Date(),
          },
      ],
      createdAt: getCreatedAt(),
      endDate: new Date(),
    },
    {
      id: getId(),
      board_id: board_id,
      pos: 1,
      title: "In-Progress",
      color: "Red",
      records: [
        {
          id: getId(),
          column_id: "x",
          pos: 0,
          color: "Purple",
          title: "Give ratings",
          description: "Rate and Star Personal Kanban",
          createdAt: getCreatedAt(),
          endDate: new Date(),
        },
      ],
      createdAt: getCreatedAt(),
      endDate: new Date(),
    },
    {
      id: getId(),
      board_id: board_id,
      pos: 2,
      title: "Completed",
      color: "Green",
      records: [
        {
          id: getId(),
          column_id: "x",
          pos: 0,
          color: "Indigo",
          title: "Be Awesome",
          description: "Rock the world with your creativity !",
          createdAt: getCreatedAt(),
          endDate: new Date(),
        },
      ],
      createdAt: getCreatedAt(),
      endDate: new Date(),
    },
  ];
  resArr.forEach(column => {
    let records : Record[] = column.records!;
    records.forEach((record, _index) => {
      record.column_id = column.id;
      record.pos = _index;
    });
  });
  // resArr.forEach(rec => {
  //   rec.endDate=getEndDate(rec.records);
  // });

  return resArr
};

export const getInitialBoardState = () => {
  let resArr =[
    {
      id: getId(),
      title: "Board 1",
      columns:  getInitialColumnState("x"),
      createdAt: getCreatedAt(),
    },
    {
      id: getId(),
      title: "Board 2",
      columns:  getInitialColumnState("x"),
      createdAt: getCreatedAt(),
    },
    {
      id: getId(),
      title: "Board 3",
      columns:  getInitialColumnState("x"),
      createdAt: getCreatedAt(),
    },

  ];
  resArr.forEach(board => {
    let columns : Column[] = board.columns!;
    columns.forEach((column, _index) => {
      column.board_id = board.id;
      column.pos = _index;
    });
  });

  return resArr
};
