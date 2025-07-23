const canSeeStudent = (board: string[][], teachers: [number, number][], N: number) => {
  const directions = [
    [-1, 0], // 위
    [1, 0],  // 아래
    [0, -1], // 왼쪽
    [0, 1],  // 오른쪽
  ];

  for (let i = 0; i < teachers.length; i++) {
    const [x, y] = teachers[i];

    // 4방향 확인 (위, 아래, 왼쪽, 오른쪽)
    for (let d = 0; d < directions.length; d++) {
      const [dx, dy] = directions[d];

      // 한 방향으로 쭉 이동하면서 확인
      let nx = x + dx;
      let ny = y + dy;

      while (0 <= nx && nx < N && 0 <= ny && ny < N) {
        const cell = board[nx][ny];

        if (cell === 'O') {
          // 장애물이면 더 이상 볼 수 없음
          break;
        }

        if (cell === 'S') {
          // 학생 발견
          return true;
        }

        // 다음 칸으로 이동
        nx += dx;
        ny += dy;
      }
    }
  }

  // 선생님 아무도 학생을 못 봤으면 감시 실패
  return false;
}


const getCombinations = (arr: any[]) => {
  const results: any[] = [];

  const combine = (start: number, path: any[]) => {
    if (path.length === 3) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      combine(i + 1, path);
      path.pop();
    }
  };

  combine(0, []);
  return results;
}

const canMonitoring = (input: any[][]) => {
  const N: number = input[0][0];
  const cleanBoard = input.slice(1) as string[][];
  const empty: any = [];
  const teacher: any = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (cleanBoard[i][j] === 'X') empty.push([i, j]);
      else if (cleanBoard[i][j] === 'T') teacher.push([i, j]);
    }
  }
  //
  console.log(empty);
  // console.log(teacher);

  const combinations = getCombinations(empty);
  console.log([...combinations].splice(0, 3));
  console.log('simulation length: ' + combinations.length);

  for (let i = 0; i < combinations.length; i++) {
    const comb = combinations[i];

    for (let j = 0; j < comb.length; j++) {
      const [x, y] = comb[j];
      cleanBoard[x][y] = 'O';
    }

    const success = !canSeeStudent(cleanBoard, teacher, N);

    if (success) {
      return 'YES';
    }

    for (let j = 0; j < comb.length; j++) {
      const [x, y] = comb[j];
      cleanBoard[x][y] = 'X';
    }
  }

  return 'NO';
};

// const board1 = [
//   [5],
//   ['X', 'S', 'X', 'X', 'T'],
//   ['T', 'X', 'S', 'X', 'X'],
//   ['X', 'X', 'X', 'X', 'X'],
//   ['X', 'T', 'X', 'X', 'X'],
//   ['X', 'X', 'T', 'X', 'X'],
// ];
//
// console.log(canMonitoring(board1)); // YES

const board2 = [
  [4],
  ['T', 'T', 'T', 'S'],
  ['X', 'X', 'X', 'X'],
  ['X', 'X', 'X', 'X'],
  ['S', 'S', 'S', 'X'],
];

console.log(canMonitoring(board2)); // NO
