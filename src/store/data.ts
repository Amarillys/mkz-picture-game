import { Action } from 'redux'
import { DataStore, GameStatus, GameType } from './types'

const initState: DataStore = {
  gameStatus: GameStatus.End,
  games: [{ type: GameType.MemoryMap, w: 7, h: 4, image: './images/bg.jpg', showTime: 2100 }],
  current: 0,
  width: 1260,
  height: 720
}

export function reducer(state: DataStore = initState, action: Action<string>): DataStore {
  switch (action.type) {
    default:
      return state
  }
}
