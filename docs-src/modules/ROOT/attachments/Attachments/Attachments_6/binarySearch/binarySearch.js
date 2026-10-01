main();
function main() {
    var Value, data, result;
    data = [
        2,
        4,
        21,
        34,
        43,
        48,
        51,
        56,
        63
    ];
    Value = 134;
    result = searchValue(data, Value);
    if (result !== -1) {
        console.log(`Item ${ Value } exists on index ${ result }`);
    } else {
        console.log(`Item ${ Value } does not exist in data`);
    }
}
function searchValue(arr, value) {
    var high, low, mid;
    low = 0;
    high = arr.length - 1;
    while (true) {
        mid = Math.floor((low + high) / 2);
        if (arr[mid] === value) {
            return mid;
        } else {
            if (arr[mid] < value) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        if (!(low <= high)) {
            break;
        }
    }
    return -1;
}