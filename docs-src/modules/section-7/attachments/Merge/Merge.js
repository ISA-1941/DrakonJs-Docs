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
        console.log('            left.length = ', left.length, 'right.length = ', right.length,'i =', i, 'j =', j, 'result = ', result);
        if (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        } else {
            break;
        }
    }
    while (true) {
        if (i < left.length) {
            result.push(left[i++]);
        } else {
            break;
        }
    }
    while (true) {
        if (j < right.length) {
            result.push(right[j++]);
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
    console.log('middle:', middle);
    left = mergeSort(arr.slice(0, middle));
    console.log('left:', left);
    right = mergeSort(arr.slice(middle));
    console.log('right:', right);
    return merge(left, right);
}