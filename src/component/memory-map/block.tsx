import React from "react";
import { padNumber } from "@/component/methods";

export enum BlockStatus {
  COVERING,
  OPENED,
  SHOWING
}

export interface BlockInfo {
  x: number;
  y: number;
  value: string;
  text: string;
  status: BlockStatus;
}

interface BlockIProps {
  info: BlockInfo;
  style: Object;
  open: (x: number, y: number) => void;
}

export function MemoryBlock(props: BlockIProps) {
  let blockOpacity = props.info.status !== BlockStatus.OPENED ? 1 : 0
  let style = {
    ...props.style,
    backgroundImage: `url(./images/block/${padNumber(
      +props.info.text,
      2
    )}.png)`,
    opacity: blockOpacity,
    transition: `opacity 1.3s`,
  };

  let maskOpacity = props.info.status === BlockStatus.COVERING ? 1 : 0
  const maskStyle = {
    transition: `opacity 1.3s`,
    opacity:　maskOpacity
  }

  let mask = (
    <div
      className="memory-block-mask"
      onClick={() => {
        if (props.info.status === BlockStatus.COVERING)
          props.open(props.info.x, props.info.y)
      }}
      style={maskStyle}
    ></div>
  );

  return (
    <div className="memory-block" style={style}>
      {mask}
    </div>
  );
}
