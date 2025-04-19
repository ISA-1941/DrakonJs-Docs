main();
function heapSort(arr) {
    var i, size, temp;
    size = arr.length;
    for (i = Math.floor(size / 2) - 1; i >= 0; i--) {
        heapify(arr, size, i);
    }
    for (i = size - 1; i > 0; i--) {
        temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
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
        11,
        32,
        23,
        74,
        85,
        90,
        62,
        48,
        53,
        10
    ];
    console.log('Input array:', array);
    heapSort(array);
    console.log('Sorted array:', array);
}