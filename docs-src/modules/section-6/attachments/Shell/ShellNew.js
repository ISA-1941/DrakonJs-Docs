main();
function main() {

    
    var array;
    array = [
        90,
        -80,
        70,
        -60,
        50,
        -40,
        30,
        -20,
        10,
        0
    ];
    console.log('Input array:', array);
    shellSort(array);
    console.log('Sorted array:', array);
}
function shellSort(arr) {
    var i, inc, j, n, temp;
    n = arr.length;
    inc = Math.floor(n / 2);
    while (true) {
        if (inc > 0) {
            for (i = inc; i < n; i++) {
                temp = arr[i];
                j = i;
                while (true) {
                    if (j >= inc && arr[j - inc] > temp) {
                        arr[j] = arr[j - inc];
                        j = j - inc;
                    } else {
                        break;
                    }
                }
                arr[j] = temp;
            }
            inc = Math.floor((inc + 1) * 5 / 11);
        } else {
            break;
        }
    }
}