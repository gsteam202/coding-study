const solution = (input: string[]) => {
  const [testCase, ...cases] = input;

  const createGoldMatrix = (goldCase: string[]) => {
    const [size, golds] = goldCase;
    const [nStr, mStr] = size.split(' ');
    const n = Number(nStr);
    const m = Number(mStr);

    const goldsArr = golds.split(' ').map(Number);

    const goldMatrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      goldMatrix.push(goldsArr.slice(i * m, (i + 1) * m));
    }

    return { goldMatrix, n, m };
  };

  for (let t = 0; t < Number(testCase); t++) {
    const { goldMatrix, n, m } = createGoldMatrix(cases.slice(t * 2, t * 2 + 2));

    // DP 테이블 생성
    const dp: number[][] = Array.from({ length: n }, () => Array(m).fill(0));

    // 첫 번째 열 초기화
    for (let i = 0; i < n; i++) {
      dp[i][0] = goldMatrix[i][0];
    }

    // DP 채우기
    for (let j = 1; j < m; j++) {
      for (let i = 0; i < n; i++) {
        const left = dp[i][j - 1]; // 왼쪽
        const leftUp = i > 0 ? dp[i - 1][j - 1] : 0; // 왼쪽 위
        const leftDown = i < n - 1 ? dp[i + 1][j - 1] : 0; // 왼쪽 아래

        dp[i][j] = goldMatrix[i][j] + Math.max(left, leftUp, leftDown);
      }
    }

    // 마지막 열에서 최댓값 찾기
    let result = 0;
    for (let i = 0; i < n; i++) {
      result = Math.max(result, dp[i][m - 1]);
    }

    console.log(result);
  }
};

solution([
  '2',
  '3 4',
  '1 3 3 2 2 1 4 1 0 6 4 7',
  '4 4',
  '1 3 1 5 2 2 4 1 5 0 2 3 0 6 1 2'
]);
// 출력: 19, 16
