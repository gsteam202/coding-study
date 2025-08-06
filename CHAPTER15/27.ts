const lowerBound = (arr: number[], N: number, target: number): number => {
  let left = 0;
  let right = N;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

const upperBound = (arr: number[], N: number, target: number): number => {
  let left = 0;
  let right = N;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

const calc = (arr: string[]): number => {
  const [N, x] = arr[0].split(' ').map((r) => Number(r));
  const numbers = arr[1].split(' ').map((r) => Number(r));

  const left = lowerBound(numbers, N, x);
  const right = upperBound(numbers, N, x);
  const count = right - left;

  return count > 0 ? count : -1;
};

console.log(calc([
  '7 2',
  '1 1 2 2 2 2 3'
])); // 4

console.log(calc([
  '7 4',
  '1 1 2 2 2 2 3'
])); // -1
