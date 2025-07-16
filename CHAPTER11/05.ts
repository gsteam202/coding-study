function count(N: number, M: number, weights: number[]) {
    console.log('input:', N, M, weights);

    const count = Array(M).fill(0);
    for (let i = 0; i < N; i++) {
        count[weights[i] - 1]++;
    }

    console.log('count:', count);

    let total = 0;
    for (let i = 1; i <= M; i++) {
        for (let j = i + 1; j <= M; j++) {
            total += count[i - 1] * count[j - 1];
        }
    }

    return total;
}

console.log('result:', count(5, 3, [1, 3, 2, 3, 2]));
console.log('result:', count(8, 5, [1, 5, 4, 3, 2, 4, 5, 2]));
