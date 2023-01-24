import { Board, Column } from "Kanban/types";

const DARK_MODE = "dark_mode";
const COLUMNS = "columns";
const BOARDS = "boards";

export function getItem(key: string) {
  return JSON.parse(localStorage.getItem(key)!);
}

export function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getDarkMode() {
  return getItem(DARK_MODE);
}

export function setDarkMode(value: boolean) {
  return setItem(DARK_MODE, value);
}

// export function setColumns(value: Column[]) {
//   return setItem(COLUMNS, value);
// }

// export function getColumns() {
//   return getItem(COLUMNS);
// }

export function setBoards(value: Board[]) {
  return setItem(BOARDS, value);
}

export function getBoards() {
  return getItem(BOARDS);
}

const StorageService = {
  getItem,
  setItem,
  getDarkMode,
  setDarkMode,
  // getColumns,
  // setColumns,
  getBoards,
  setBoards,
};

export default StorageService;
