type Cell = 'S' | 'T' | 'X' | 'O';
type Pos = [number, number];

const directions: Pos[] = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1],  // right
];

// 학생이 감시되는지 확인
function canSeeStudent(board: Cell[][], teachers: Pos[], N: number): boolean {
  for (const [x, y] of teachers) {
    for (const [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;

      while (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (board[nx][ny] === 'O') break;
        if (board[nx][ny] === 'T') return true;
        nx += dx;
        ny += dy;
      }
    }
  }
  return false;
}

// 조합 생성 함수
function getCombinations<T>(arr: T[], select: number): T[][] {
  if (select === 0) return [[]];
  if (arr.length === 0) return [];

  const [first, ...rest] = arr;

  const withFirst = getCombinations(rest, select - 1).map(comb => [first, ...comb]);
  const withoutFirst = getCombinations(rest, select);

  return [...withFirst, ...withoutFirst];
}

// 메인 함수
function solve(board: Cell[][]): string {
  const N = board.length;
  const empty: Pos[] = [];
  const teachers: Pos[] = [];

  // 빈 공간, 선생님 위치 수집
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 'X') empty.push([i, j]);
      if (board[i][j] === 'S') teachers.push([i, j]);
    }
  }

  const combinations = getCombinations(empty, 3);

  for (const comb of combinations) {
    // 장애물 설치
    for (const [x, y] of comb) board[x][y] = 'O';

    // 감시 여부 확인
    if (!canSeeStudent(board, teachers, N)) return 'YES';

    // 원상복구
    for (const [x, y] of comb) board[x][y] = 'X';
  }

  return 'NO';
}

// 예제 테스트
const board1: Cell[][] = [
  ['X', 'S', 'X', 'X', 'T'],
  ['T', 'X', 'S', 'X', 'X'],
  ['X', 'X', 'X', 'X', 'X'],
  ['X', 'T', 'X', 'X', 'X'],
  ['X', 'X', 'T', 'X', 'X'],
];

console.log(solve(board1)); // YES

const board2: Cell[][] = [
  ['S', 'S', 'S', 'T'],
  ['X', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X'],
  ['T', 'T', 'T', 'X'],
];

console.log(solve(board2)); // NO
