main();
function main() {
    var array;
    array = [
        78,
        11,
        81,
        21,
        71,
        31,
        61,
        41,
        51,
        24
    ];
    console.log('Input array:', array);
    array = quickSort(array);
    console.log('Sorted array:', array);
}
function quickSort(arr) {
    var equal, left, num, pivot, right;
    if (arr.length <= 1) {
        return arr;
    }
    pivot = arr[Math.floor(arr.length / 2)];
    left = [];
    right = [];
    equal = [];
    for (num of arr) {
        if (num < pivot) {
            left.push(num);
           } else {
            if (num > pivot) {
                right.push(num);
            } else {
                equal.push(num);
            }
        }
    }
    console.log("left = ", left, "equal = ", equal, "right = ", right)
    return [
        ...quickSort(left),
        ...equal,
        ...quickSort(right)
    ];
}