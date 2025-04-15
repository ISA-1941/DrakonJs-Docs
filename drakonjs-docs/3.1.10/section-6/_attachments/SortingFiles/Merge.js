main();
function main() {
    var array, sorted;
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
    sorted = mergeSort(array);
    console.log('Sorted array:', sorted);
}
function merge(left, right) {
    var i, j, result;
    result = [];
    i = 0;
    j = 0;
    while (true) {
        if (i < left.length || j < right.length) {
            if (i === left.length) {
                result.push(right[j++]);
            } else {
                if (j === right.length) {
                    result.push(left[i++]);
                } else {
                    if (left[i] >= right[j]) {
                        result.push(right[j++]);
                    } else {
                        result.push(left[i++]);
                    }
                }
            }
        } else {
            break;
        }
    }
    return result;
}
function mergeSort(arr) {
    var left, middle, right;
    if (arr.length < 2) {
        return arr;
    }
    middle = Math.floor(arr.length / 2);
    left = mergeSort(arr.slice(0, middle));
    right = mergeSort(arr.slice(middle));
    return merge(left, right);
}