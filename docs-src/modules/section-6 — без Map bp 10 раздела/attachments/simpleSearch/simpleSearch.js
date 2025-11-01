main();
function main() {
    var data, value;
    data = [
        12,
        21,
        44,
        76,
        -4,
        33,
        78,
        -8,
        8,
        17
    ];
    console.log('input data -->', data);
    value = 76;
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