main();
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
    console.log('input data -->', data);
    value = 77;
    console.log('searching value -->', value);
    searchElement(data, value);
}
function searchElement(data, value) {
    var found, i;
    found = false;
    for (i = 0; i < data.length; i++) {
        if (data[i] === value) {
            found = true;
            console.log('The searched element - index =', i, 'value = ', value);
        }
    }
    if (!found) {
        console.log('The element', value, 'is missing');
    }
}