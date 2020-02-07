import React from 'react'
import { connect } from 'react-redux'
import MemoryMap from '@/component/memory-map'
import ACTION from '@/store/action'

import { DataStore, GameType } from '@/store/types'
interface Props {}

function mapStateToProps (state: DataStore) {
  return {
    detail: state.games[state.current]
  }
}

function mapDispatchToProps(dispatch: (obj: any) => void) {
  return {
    setGameType: (type: GameType) => dispatch(ACTION.setGameType)
  }
}

class Game extends React.Component<Props> {
  constructor(prop: Props) {
    super(prop)
    this.state = {

    }
  }

  render() {
    return (
    <div id="game">
      <MemoryMap></MemoryMap>
    </div>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
