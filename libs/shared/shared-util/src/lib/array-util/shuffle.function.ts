export const shuffle = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
  }
};
