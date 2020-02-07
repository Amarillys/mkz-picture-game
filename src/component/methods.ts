export function range(start: number = 0, end: number, step: number = 1) {
  const len = (end - start) / step
  let ret = new Array(len)
  ret[0] = start
  for (let i = 1; i < len; ++i)
    ret[i] = ret[i - 1] + step
  return ret
}

export function padNumber(num: number, fill: number = 2) {
  const len = ('' + num).length;
  return (Array(
    fill > len ? fill - len + 1 || 0 : 0
  ).join('0') + num);
}

export function randomArray(arr: Array<any>) {
  const randomComp = () => (0.5 - Math.random())
  return arr.sort(randomComp)
}
