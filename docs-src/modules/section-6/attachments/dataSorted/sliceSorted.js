main();
function dataSorted(data,value) {
    var i, size;
    size = data.length;
    i = -1;
    while (true) {
        i++;
        if (true) {
            if (data[i] >= value) {
                console.log('The element value -->', value);
                return;
            }
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
    dataSorted(data, value);
}