import {BoardData, Board, Column, Record } from "Kanban/types";
import axios, { AxiosError } from "axios";

const DARK_MODE = "dark_mode";
const COLUMNS = "columns";
const BOARDS = "boards";

//interface for the Helper
interface Params {
  baseUrl: string
  headers : any
  method: string
}
axios.defaults.withCredentials = true


export function getBoardsDB() {
  return getItem(BOARDS);
}
// export async function getBoardsDB() {
//   const config: Params = {
//     baseUrl:  `${process.env.REACT_APP_API_URL}getBoards`,
//     headers: {
//     //     "Authorization": "",
//             },
//     method: 'get',
//   }
//   console.log(config.baseUrl);
//   try {
//     //console.log(config) 
//     const response = await axios(config);
//     const res = response.data;
//     console.log(res) 
//     return res;  
    
//   } catch (error) {
//       console.error("Error", error);
//       return 0;
//   }
// }

export async function getBoardOwnerAndBoardsFromSessionID() {
  console.log("getBoardOwnerAndBoardsFromSessionID in StorageServiceDB") 
  const url = `${process.env.REACT_APP_API_URL}getBoardOwnerAndBoardsFromSessionID`;
  console.log(url);
  let boardData : BoardData = {BoardOwnerID: 0, BoardOwnerName:'', boards: []}

  return axios.get (url,
    {
      withCredentials: true, 
      headers: {
        'Access-Control-Allow-Origin': 'https://scanner.inspect.de',
        'Access-Control-Allow-Credentials': true, 
        'Content-Type': 'application/json'
      },
    }).then(
    response => {
      console.log("response axios") 
      //console.log(response);
      if (response.data.BoardOwnerID ===0) return {BoardOwnerID: 0, BoardOwnerName:''}
      boardData = {
        BoardOwnerID: response.data.BoardOwnerID,
        BoardOwnerName:response.data.BoardOwnerName,
        boards: response.data.boards
      }
      //console.log(boardData)
      return boardData;
    })
  .catch((err: Error | AxiosError) => {
    if (axios.isAxiosError(err))  {
      // Access to config, request, and response
      console.log("AxiosError") 
      console.log(err) 
    } else {
      // Just a stock error
      console.log("Other Error") 
      console.log(err) 
    }
    return boardData;
  })
}

async function getColumnsFromBoardID(boardID:number) {
  console.log("getBoardOwnerAndBoardsFromSessionID in StorageServiceDB") 
  const url = `${process.env.REACT_APP_API_URL}getColumnsFromBoardID`;
  console.log(url);
  let boardData : BoardData = {BoardOwnerID: 0, BoardOwnerName:'', boards: []}

  return axios.post (url,
    { 
      boardID: boardID
    },
    {
      withCredentials: true, 
      headers: {
        'Access-Control-Allow-Origin': 'https://api.inspect.de',
        'Content-Type': 'application/json'
      },
    }).then(
      response => {

    })
    .catch((err: Error | AxiosError) => {
      if (axios.isAxiosError(err))  {
        // Access to config, request, and response
        console.log("AxiosError") 
        console.log(err) 
      } else {
        // Just a stock error
        console.log("Other Error") 
        console.log(err) 
      }
      return boardData;
    })
}


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
  getBoardsDB,
  getBoardOwnerAndBoardsFromSessionID,
};

export default StorageService;
