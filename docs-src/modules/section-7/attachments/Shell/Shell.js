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
            console.log(''); 
            console.log('inc = ',inc); 
            console.log(''); 
            for (i = inc; i < n; i++) {
                temp = arr[i];
                j = i;
                console.log('i = ', i, 'temp = ', temp);
                while (true) {
                    if (j >= inc && arr[j - inc] > temp) {
                        console.log('j = ', j, 'j-inc = ',j-inc);
                        console.log('arr[j] = ', arr[j]);
                        arr[j] = arr[j - inc];
                        console.log('::::::::::::::::::::::::::::::::::::::::'); 
                        console.log('j = ', j,'arr[j] = ', arr[j], 'temp = ', temp);
                        console.log('::::::::::::::::::::::::::::::::::::::::'); 
                        j = j-inc
                    } else {
                        break;
                    }
                }
                arr[j] = temp;
            }
            inc = Math.floor(inc / 2);
        } else {
            break;
        }
    }
}