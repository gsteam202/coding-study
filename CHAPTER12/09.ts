const compressString = (s: string): number => {
  const length = s.length;
  let minCompressedLength = length;

  for (let unit = 1; unit <= Math.floor(length / 2); unit++) {
    let compressed = '';
    let prev = s.slice(0, unit);
    let count = 1;

    for (let j = unit; j < length; j += unit) {
      const current = s.slice(j, j + unit);
      if (current === prev) {
        count++;
      } else {
        compressed += (count > 1 ? count : '') + prev;
        prev = current;
        count = 1;
      }
    }

    compressed += (count > 1 ? count : '') + prev;

    minCompressedLength = Math.min(minCompressedLength, compressed.length);
  }

  return minCompressedLength;
};

console.log(compressString('aabbaccc'));
console.log(compressString('ababcdcdababcdcd'));
console.log(compressString('abcabcdede'));
console.log(compressString('abcabcabcabcdededededede'));
console.log(compressString('xababcdcdababcdcd'));