import { GameType } from "./types";

export default {
  setGameType: (type: GameType) => ({
    type: 'setGameType',
    value: type
  })
}