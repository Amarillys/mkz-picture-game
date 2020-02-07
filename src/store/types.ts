export enum GameStatus{
  End,
  Playing
}

export enum GameType {
  MemoryMap
}

export interface GameDetail {
  type: GameType,
  w: number,
  h: number,
  image: string,
  showTime: number
}

export interface DataStore {
  gameStatus: GameStatus,
  games: Array<GameDetail>,
  current: number,
  width: number,
  height: number
}
