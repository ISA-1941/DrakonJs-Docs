main();
function lineSearch(data,value) {
    var i, size;
    size = data.length;
    i = -1;
    while (true) {
        i++;
        if (true) {
            if (data[i] === value) {
                console.log('The element value -->', value);
            } else {
                console.log('The element value ', value, 'is missing');
            }
            return;
        } else {
            break;
        }
    }
}
function main() {
    var data, value;
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
    console.log('Input data -->', data);
    value = 34;
    sliceSearch(data, value);
}
function sliceSearch(data,value) {
    var i, size;
    size = data.length;
    console.log('size = ', size);
    for (i = 0; i < size; i++) {
        if (data[i] === value) {
            console.log('The element value -->', value, 'found = ', i + 1);
            return;
        }
    }
    console.log('The element value ', value, 'is missing');
}