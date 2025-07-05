const sortString = (unSortedString: string) => {
  const characters: string[] = [];
  let numbers = 0;

  for (let i = 0; i < unSortedString.length; i++) {
    if (new RegExp(/[A-Z]/).test(unSortedString[i])) {
      characters.push(unSortedString[i]);
    } else {
      numbers += Number(unSortedString[i]);
    }
  }

  return characters.sort().join('') + numbers;
}

console.log(sortString('K1KA5CB7'));
console.log(sortString('AJKDLSI412K4JSJ9D'));