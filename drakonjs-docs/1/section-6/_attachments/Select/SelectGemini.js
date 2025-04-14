function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      // Находим индекс минимального элемента в оставшейся неотсортированной части
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      // Если найден новый минимальный элемент, меняем его местами с текущим первым элементом неотсортированной части
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // ES6 деструктурирующее присваивание для обмена
      }
      // Для наглядности можно выводить массив после каждой итерации
      // console.log(`Итерация ${i + 1}:`, arr);
    }
    return arr;
  }
  
  const myArray = [90, 12, 83, 24, 75, 38, 62, 41, 59, 10];
  console.log('Input array:', myArray);
  selectionSort(myArray);
  console.log('Sorted array:', myArray);
  