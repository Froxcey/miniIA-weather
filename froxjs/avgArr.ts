export default function avgArr(input: Array<number>) {
  return Math.round((input.reduce((a, b) => a + b, 0) / input.length) * 10) / 10;
}
