import React from "react";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import KanbanBoard from "Kanban/components/KanbanBoard";
import { BoardData, Board, Column, Record } from "Kanban/types";
import {
  getId,
  getCreatedAt,
  getInitialColumnState,
  getInitialBoardState,
  reorder,
  reorderCards,
} from "Kanban/services/Utils";
import StorageService from "Kanban/services/StorageServiceDB";
import Toolbar from "Kanban/containers/Toolbar";

const useKanbanBoardStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

type KanbanBoardContainerProps = {};

// let initialColumnState = StorageService.getColumns();

// if (!initialColumnState) {
//   initialColumnState = getInitialColumnState("x");
// }

let initialBoardState = StorageService.getBoardsDB();

if (!initialBoardState) {
  initialBoardState = getInitialBoardState();
}


const KanbanBoardContainer: React.FC<KanbanBoardContainerProps> = (props) => {
  const [boards, setBoards] = React.useState<Board[]>(initialBoardState);
  const [board_index, setBoard_index] = React.useState<number>(0);
  const [boardOwnerID, setBoardOwnerID] = React.useState<number>(-1);
 // const [boardChanged, setBoardChanged] = React.useState<boolean>(false);
 const [columns, setColumns] = React.useState<Column[]>(boards[0].columns!);

  const classes = useKanbanBoardStyles();

  const cloneColumns = React.useCallback((columns: Column[]) => {
    return columns.map((column: Column) => ({
      ...column,
      records: [...column.records!],
    }));
  }, []);
  
  const cloneBoards = React.useCallback((boards: Board[]) => {
    return boards.map((board: Board) => ({
      ...board,
      columns: cloneColumns(board.columns!),
    }));
  }, []);

  const getBoardIndex = React.useCallback(
    (id: string) => {
      return boards.findIndex((b: Board) => b.id === id);
    },
    [boards]
  );

  const getColumnIndex = React.useCallback(
    (id: string) => {
      return columns.findIndex((c: Column) => c.id === id);
    },
    [columns, getBoardIndex]
  );

  const getRecordIndex = React.useCallback(
    (recordId: string, columnId: string) => {
      return columns[getColumnIndex(columnId)]?.records?.findIndex(
        (r: Record) => r.id === recordId
      );
    },
    [columns, getColumnIndex]
  );

  const handleClearBoard = React.useCallback(() => {
    setColumns([]);
  }, []);

  const handleAddBoard = React.useCallback(
    ({ board }: { board: Board }) => {
      setBoards((_boards: Board[]) => {
        const new_column_id = getId();
        const new_board_id = getId();
        const new_records: Record[] = [];
        const new_column: Column =
          {
            id: new_column_id,
            board_id: new_board_id,
            pos: 0,
            title: "NewBoardColumns",
            description: "Automatically created with new board",
            caption: "WIP Limits : 5",
            records: new_records,
            createdAt: getCreatedAt(),
            endDate: new Date(),
          }
        const _columns: Column[] = [];
        _columns.push(new_column);
        _columns.forEach((col, _index) => {
          col.pos = _index;
        });
        const boards : Board[]= cloneBoards(_boards);
        const new_board: Board =
          {
            id: new_board_id,
            title: board.title,
            description: board.description,
            columns: _columns,
            createdAt: getCreatedAt()
          }
          boards.push(new_board);

        setBoards(boards);


        //const b_index = getBoardIndex(new_board_id);
        //setBoard_index(b_index);
        //boards[b_index].columns=columns;
        return boards;
      });
    },
    []
  );
  const handleAddColumn = React.useCallback(
    ({ column }: { column: Column }) => {
      setColumns((_columns: Column[]) => {
        const columns = [
          ..._columns,
          Object.assign(
            { id: getId(), records: [], createdAt: getCreatedAt() },
            column
          ),
        ];
        columns.forEach((col, _index) => {
          col.pos = _index;
        });
        boards[board_index].columns=columns;
        return columns;
      });
    },
    []
  );

  const handleColumnMove = React.useCallback(
    ({ column, index }: { column: Column; index: number }) => {
      const updatedColumns = reorder(columns, getColumnIndex(column.id), index);
      updatedColumns.forEach((col, _index)=> {
        col.index = _index;
        let records: Record[] = col.records;
        records.forEach((rec, _index) => {
          rec.column_id = col.id;
          rec.pos = _index;    
        });
      });
      setColumns(updatedColumns);
      boards[board_index].columns=updatedColumns;
    },
    [columns, getColumnIndex]
  );

  const handleColumnEdit = React.useCallback(
    ({ column }: { column: Column }) => {
      setColumns((_columns: Column[]) => {
        const columnIndex = getColumnIndex(column.id);
        const columns = cloneColumns(_columns);
        columns[columnIndex].title = column.title;
        columns[columnIndex].description = column.description;
        columns[columnIndex].color = column.color;
        columns[columnIndex].endDate = column.endDate;
        columns[columnIndex].wipEnabled = column.wipEnabled;
        columns[columnIndex].wipLimit = column.wipLimit;
        boards[board_index].columns=columns;
        return columns;
      });
    },
    [getColumnIndex, cloneColumns]
  );

  const handleColumnDelete = React.useCallback(
    ({ column }: { column: Column }) => {
      setColumns((_columns: Column[]) => {
        const columns = cloneColumns(_columns);
        columns.splice(getColumnIndex(column.id), 1);
        columns.forEach((col, _index) => {
          col.pos = _index;
        });
        boards[board_index].columns=columns;
        return columns;
      });
    },
    [cloneColumns, getColumnIndex]
  );

  const handleCardMove = React.useCallback(
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
      boards[board_index].columns=updatedColumns;
    },
    [columns, getRecordIndex]
  );

  const handleAddRecord = React.useCallback(
    ({ column, record }: { column: Column; record: Record }) => {
      const columnIndex = getColumnIndex(column.id);
      setColumns((_columns: Column[]) => {
        const columns = cloneColumns(_columns);

        columns[columnIndex].records = [
          {
            id: getId(),
            column_id: column.id,
            pos: 0,
            title: record.title,
            description: record.description,
            color: record.color,
            createdAt: getCreatedAt(),
            endDate: record.endDate,
          },
          ...columns[columnIndex].records,
        ];
        columns[columnIndex].records.forEach((rec, _index)=>{
          rec.pos = _index;
        })
        boards[board_index].columns=columns;
        return columns;
      });
    },
    [cloneColumns, getColumnIndex]
  );

  const handleRecordEdit = React.useCallback(
    ({ column, record }: { column: Column; record: Record }) => {
      const columnIndex = getColumnIndex(column.id);
      const recordIndex = getRecordIndex(record.id, column.id);
      setColumns((_columns) => {
        const columns = cloneColumns(_columns);
        const _record = columns[columnIndex].records[recordIndex!];
        _record.title = record.title;
        _record.description = record.description;
        _record.color = record.color;        
        _record.endDate = record.endDate;
        boards[board_index].columns=columns;
        return columns;
        
      });
    },
    [getColumnIndex, getRecordIndex, cloneColumns]
  );

  const handleRecordDelete = React.useCallback(
    ({ column, record }: { column: Column; record: Record }) => {
      const columnIndex = getColumnIndex(column.id);
      const recordIndex = getRecordIndex(record.id, column.id);
      setColumns((_columns) => {
        const columns = cloneColumns(_columns);
        columns[columnIndex].records.splice(recordIndex!, 1);
        boards[board_index].columns=columns;
        return columns;
      });
    },
    [cloneColumns, getColumnIndex, getRecordIndex]
  );

  const handleAllRecordDelete = React.useCallback(
    ({ column }: { column: Column }) => {
      const columnIndex = getColumnIndex(column.id);
      setColumns((_columns) => {
        const columns = cloneColumns(_columns);
        columns[columnIndex].records = [];
        boards[board_index].columns=columns;
        return columns;
      });
    },
    [cloneColumns, getColumnIndex]
  );

  const handleSetBoard_id = React.useCallback((b_id: string) => {
    console.log("handleSetBoard_id b_id: "+b_id);
    //console.log(board_id);
    let b_index:number = getBoardIndex(b_id);
    setBoard_index(b_index);  
    console.log('handleSetBoard_id b_index: '+b_index) ;
    console.log('handleSetBoard_id id of index: '+boards[b_index].id)
    // Load new Columns
    if (boards[b_index].columns) setColumns(boards[b_index].columns!);
    // let _columns : Column[] = boards.find((b: Board) => b.id === b_id)!.columns!;
    // console.log(_columns);
    // setColumns(cloneColumns(_columns));
    // setBoard_id(b_id);
  }, [boards, board_index]);

  const loadBoards = React.useCallback(() => {
    StorageService.getBoardOwnerAndBoardsFromSessionID().then(
      res => {
        // console.log("getBoardOwnerAndBoardsFromSessionID in useEffect");
        // console.log(res.BoardOwnerID);
        // console.log(res.boards!)
        let boardData: BoardData = res;
        let boards : Board[] = boardData.boards!;
        if (boardData.BoardOwnerID > 0){
          setBoards(boards);
          setBoardOwnerID(boardData.BoardOwnerID);
          setBoard_index(0); 
          //console.log(boards[0].columns);
          setColumns(boards[0].columns!);
         }
        else setBoardOwnerID(0); // nothing found
      }
    ).catch(error => {
        console.error("Error", error);
        setBoardOwnerID(0); // don't try again
    });   
  }, [boardOwnerID]);

  React.useEffect(() => {
      if (boardOwnerID === -1) { // first call or load again
        loadBoards();
      }
  }, [boardOwnerID]);  

  // Columns changed
  React.useEffect(() => {

    //console.log("setBoards");
    //StorageService.setColumns(columns);
    //StorageService.setBoards(boards);
    console.log(boards);
    console.log(columns);
    // Get Data from DB
  
  }, [columns, board_index, boardOwnerID]);

  return (
    <>
      <Toolbar
        clearButtonDisabled={!columns.length}
        onNewColumn={handleAddColumn}
        onClearBoard={handleClearBoard}
        onNewBoard={handleAddBoard}
        setBoard_id={handleSetBoard_id}
    //    board_id = {boards[board_index].id}
        boards = {boards}
      />
      <div className={classes.toolbar} />
      <Box padding={1}>
        <KanbanBoard
          columns={columns}
          onColumnMove={handleColumnMove}
          onColumnEdit={handleColumnEdit}
          onColumnDelete={handleColumnDelete}
          onCardMove={handleCardMove}
          onAddRecord={handleAddRecord}
          onRecordEdit={handleRecordEdit}
          onRecordDelete={handleRecordDelete}
          onAllRecordDelete={handleAllRecordDelete}
        />
      </Box>
    </>
  );
};

export default KanbanBoardContainer;
