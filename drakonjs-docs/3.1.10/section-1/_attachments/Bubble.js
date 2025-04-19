main();
function bubbleSort(arr) {
    var i, j, temp;
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        console.log('i = ', i, arr);
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
    bubbleSort(array);
    console.log('Sorted array:', array);
}