main();
function main() {
    var array;
    array = [
        90,
        11,
        81,
        21,
        71,
        31,
        61,
        41,
        51,
        10
    ];
    console.log('Input array:', array);
    selectionSort(array);
    console.log('Sorted array:', array);
}
function selectionSort(arr) {
    var i, j, min, temp;
    for (i = 0; i < arr.length; i++) {
        min = i;
        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
}