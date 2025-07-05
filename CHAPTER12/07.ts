const luckyStraight = (input: number) => {
  const inputStr = input.toString();
  const front = new Array(inputStr.length / 2).fill(0).reduce((acc, _cur, i) => acc + Number(inputStr[i]), 0);
  const back = new Array(inputStr.length / 2).fill(0).reduce((acc, _cur, i) => acc + Number(inputStr[i + inputStr.length / 2]), 0);

  return front === back ? 'LUCKY' : 'READY';
};

console.log(luckyStraight(123402));
console.log(luckyStraight(7755));