export const splitArrayIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
  const newArr = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    newArr.push(chunk);
  }
  return newArr;
};
