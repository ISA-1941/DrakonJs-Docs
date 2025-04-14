main();
function insertSort(arr) {
    var i, j, temp;
    for (i = 1; i < arr.length; i++) {
        j = i;
        while (true) {
            if (j > 0 && arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                j--;
            } else {
                break;
            }
        }
    }
}
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
    insertSort(array);
    console.log('Sorted array:', array);
}