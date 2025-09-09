function solve(rawInput: string): number {
  const input = rawInput.trim().split("\n");
  const G = parseInt(input[0], 10); // 탑승구 수
  const P = parseInt(input[1], 10); // 비행기 수
  const planes = input.slice(2, 2 + P).map(Number); // 도킹 가능 탑승구 정보

  const parent = new Array(G + 1).fill(0).map((_, i) => i);
  console.log(`parent: ${parent}`)

  function find(x: number): number { // 가장 가까운 사용 가능한 게이트 찾기
    if (parent[x] === x) return x;
    const root = find(parent[x]);
    console.log(`root of ${root} / x: ${x}`);
    parent[x] = root;
    return root;
  }

  function union(a: number, b: number) {
    a = find(a);
    b = find(b);
    parent[a] = b;
  }

  let answer = 0;

  for (let g of planes) {
    let root = find(g);
    console.log(`> ${g} / root: ${root}`);
    if (root === 0) { // 0 = 게이트 없음
      console.log(`> break: ${parent}`)
      break;
    }
    answer++;
    union(root, root - 1);
    console.log(`> arrived: ${parent}`);
  }

  return answer;
}

// console.log(solve(`4
// 3
// 4
// 1
// 1`));

console.log(solve(`4
6
2
2
3
3
4
4`));
