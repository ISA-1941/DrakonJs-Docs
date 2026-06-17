main();
function heapSort(arr) {
    var i, size, temp;
    size = arr.length;
    console.log('size = ', size, 'Begining:', arr);
    for (i = Math.floor(size / 2) - 1; i >= 0; i--) {
        console.log('                   i = ', i);
        console.log('Before heapify:', arr);
        heapify(arr, size, i);
        console.log('After heapify:', arr);
    }
    console.log('size = ', size, 'After heapify:', arr);
    for (i = size - 1; i > 0; i--) {
        temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
        console.log('size = ', size, 'i =', i, 'heapify:', arr);
    }
}
function heapify(arr, size, i) {
    var largest, left, right, temp;
    largest = i;
    left = 2 * i + 1;
    right = 2 * i + 2;
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, size, largest);
    }
}
function main() {
    var array;
    array = [
        23,
        5,
        20,
        52,
        11,
        41,
        14
    ];
    console.log('Input array:', array);
    heapSort(array);
    console.log('Sorted array:', array);
}