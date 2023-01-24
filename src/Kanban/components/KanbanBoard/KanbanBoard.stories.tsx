import React from "react";
import faker from "faker";

import KanbanBoard from "Kanban/components/KanbanBoard";
import { Column, Record } from "Kanban/types";
import { getId, reorder, reorderCards, getEndDate } from "Kanban/services/Utils";
import { getImpliedNodeFormatForFile } from "typescript";
import { id } from "date-fns/locale";

const getCards = (count: number, columnID: string): Record[] => {
  return new Array(count).fill(0).map(() => ({
    id: getId(),
    column_id :columnID,
    pos: 0,
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    endDate: new Date(),
  }));
};

const getColumns = (boardID: string): Column[] => {
  let arr : Column[] =
  [
    {
      id: getId(),
      board_id : boardID,
      pos: 0,
      title: "Todo",
      endDate: getEndDate(getCards(10, "x")),
      records: getCards(10, "x"),
    },
    {
      id: getId(),
      board_id : boardID,
      pos: 1,
      title: "In-Progress",
      endDate: getEndDate(getCards(10, "x")),
      records: getCards(10, "x"),
    },
    {
      id: getId(),
      board_id : boardID,
      pos: 2,
      title: "Completed",
      endDate: getEndDate(getCards(10, "x")),
      records: getCards(10, "x"),
    },
  ];
  arr.forEach(col => {
    let records : Record[] = col.records!;
    records.forEach((record, _index) => {
      record.column_id = col.id;
      record.pos = _index;
    });
    
  });
  return arr;
};

const stories = {
  title: "Kanban/KanbanBoard",
  component: KanbanBoard,
};

const Template = (args: any) => {
  const [columns, setColumns] = React.useState(args.columns || getColumns(args.board_id));

  const getColumnIndex = React.useCallback(
    (id: string) => {
      return columns.findIndex((c: Column) => c.id === id);
    },
    [columns]
  );

  const getRecordIndex = React.useCallback(
    (recordId: string, columnId: string) => {
      return columns[getColumnIndex(columnId)]?.records?.findIndex(
        (r: Record) => r.id === recordId
      );
    },
    [columns, getColumnIndex]
  );

  const onCardMove = React.useCallback(
    ({
      column,
      index,
      source,
      record,
    }: {
      column: Column;
      index: number;
      source: Column;
      record: Record;
    }) => {
      const updatedColumns = reorderCards({
        columns,
        destinationColumn: column,
        destinationIndex: index,
        sourceColumn: source,
        sourceIndex: getRecordIndex(record.id, source.id)!,
      });

      setColumns(updatedColumns);
    },
    [columns, getRecordIndex]
  );

  const onColumnMove = React.useCallback(
    ({ column, index }: { column: Column; index: number }) => {
      const updatedColumns = reorder(columns, getColumnIndex(column.id), index);
      setColumns(updatedColumns);
    },
    [columns, getColumnIndex]
  );

  return (
    <KanbanBoard
      {...args}
      columns={columns}
      onColumnMove={onColumnMove}
      onCardMove={onCardMove}
    />
  );
};

export const Default: any = Template.bind({});
Default.args = {};

export const Stress: any = Template.bind({});
Stress.args = {
  columns: new Array(20).fill(0).map(() => ({
    id: getId(),
    title: faker.commerce.department(),
    description: faker.lorem.sentence(),
    caption: faker.lorem.words(),
    records: new Array(10).fill(0).map(() => ({
      id: getId(),
      title:
        faker.commerce.productAdjective() + faker.commerce.productDescription(),
      description: faker.lorem.sentences(),
      caption: faker.lorem.words(),
    })),
  })),
};

export default stories;
