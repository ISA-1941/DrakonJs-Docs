function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);
  
    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;
        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
        }
        arr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    return arr;
  }
  
  const unsortedArray = [12, 34, 54, 2, 3, 53, 1, 98, 76, 33];
  const sortedArray = shellSort(unsortedArray);
  console.log(":", sortedArray); 