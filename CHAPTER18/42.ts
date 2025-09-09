function solve(rawInput: string): number {
  const input = rawInput.trim().split("\n");
  const G = parseInt(input[0], 10);
  const P = parseInt(input[1], 10);
  const planes = input.slice(2, 2 + P).map(Number);

  const parent = new Array(G + 1).fill(0).map((_, i) => i);

  function find(x: number): number {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  }

  function union(a: number, b: number) {
    a = find(a);
    b = find(b);
    parent[a] = b;
  }

  let answer = 0;

  for (let g of planes) {
    let root = find(g);
    if (root === 0) break;
    answer++;
    union(root, root - 1);
  }

  return answer;
}

console.log(solve(`4
3
4
1
1`));

console.log(solve(`4
6
2
2
3
3
4
4`));
