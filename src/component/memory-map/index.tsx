import React from 'react'
import './index.css'
import { connect } from 'react-redux'
import { DataStore, GameDetail } from '@/store/types'
import { BlockInfo, MemoryBlock, BlockStatus } from './block'
import { range, randomArray } from '@/component/methods'

function mapStateToProps (state: DataStore) {
  return {
    detail: state.games[state.current],
    windowInfo: { w: state.width, h: state.height }
  }
}

function mapDispatchToProps(dispatch: (obj: any) => void) {
  return {
    
  }
}

interface IProps {
  detail: GameDetail
  windowInfo: { w: number, h: number }
}

interface State {
  blocks: Array<BlockInfo>,
  opened: number
}

class MemoryMap extends React.Component<IProps, State> {
  rightAudioRef: React.RefObject<HTMLAudioElement>
  wrongAudioRef: React.RefObject<HTMLAudioElement>
  constructor(props: IProps) {
    super(props)
    this.state = {
      blocks: this.initialBlock(props.detail),
      opened: -1
    }
    this.openBlock = this.openBlock.bind(this)
    this.rightAudioRef = React.createRef()
    this.wrongAudioRef = React.createRef()
  }

  render() {
    let prop = this.props
    let {w, h} = prop.detail
    let memeoryBlocks = new Array(h)
    const paddingW = 80
    const paddingH = 45

    // style
    const mapStyle = {
      width: prop.windowInfo.w,
      height: prop.windowInfo.h,
      padding: `${paddingH}px ${paddingW}px`,
      backgroundImage: `url(${prop.detail.image})`
    }

    const blockStyle = {
      width: mapStyle.width / w,
      height: mapStyle.height / h
    }

    // iterate blocks
    for (let y = 0; y < h; ++y) {
      let line = []
      for (let x = 0; x < w; ++x) {
        let text = this.state.blocks[w * y + x].text
        let status = this.state.blocks[w * y + x].status
        let block = 
          <MemoryBlock 
            info={{ x, y, value: 'x', text, status }} 
            key={ x + '' + y }
            style={blockStyle}
            open={this.openBlock}
          ></MemoryBlock>
        line.push(block)
      }
        
      memeoryBlocks[y] = <div className="block-line" key={ `line-${y}` }>{ line }</div>
    }


    return (
      <div id="game-map" style={mapStyle}>
        { memeoryBlocks }
        <audio src="./audio/right.ogg" ref={this.rightAudioRef}></audio>
        <audio src="./audio/wrong.ogg" ref={this.wrongAudioRef}></audio>
      </div>
    )
  }

  initialBlock(detail: GameDetail): Array<BlockInfo> {
    const len = detail.w * detail.h
    let blocks = new Array(len)
    let blockTextArr = randomArray(range(0, len / 2).concat(range(0, len / 2)))
    for (let y = 0; y < detail.h; ++y)
      for (let x = 0; x < detail.w; ++x) {
        const index = detail.w * y + x
        blocks[index] = {
          value: 'x', x, y, text: blockTextArr[index], status: BlockStatus.COVERING
        }
      }
    return blocks
  }

  openBlock(x: number, y:number): void {
    const index = y * this.props.detail.w + x
    let blocks = this.state.blocks
    let opened = blocks[index].text

    if (this.state.opened === -1) {
      blocks[index].status = BlockStatus.SHOWING
      this.setState({
        opened: index, blocks
      })
    } else {
      blocks[index].status = BlockStatus.SHOWING
      blocks[this.state.opened].status = BlockStatus.SHOWING
      let oldOpened = this.state.opened
      if (blocks[this.state.opened].text === opened) {
        // right
        this.rightAudioRef.current?.play()
        setTimeout(() => {
          blocks[index].status = BlockStatus.OPENED
          blocks[oldOpened].status = BlockStatus.OPENED
          this.setState({ blocks })
        }, this.props.detail.showTime)
      } else {
        // wrong
        this.wrongAudioRef.current?.play()
        setTimeout(() => {
          blocks[index].status = BlockStatus.COVERING
          blocks[oldOpened].status = BlockStatus.COVERING
          this.setState({ blocks })
        }, this.props.detail.showTime)
      }
      this.setState({
        opened: -1, blocks
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryMap)
