main();
function main() {
    var dataArray, key, myMap, value;
    myMap = new Map();
    dataArray = [
        {
            key: 123456,
            value: 'Doe D.'
        },
        {
            key: 987654,
            value: 'Jane K.'
        },
        {
            key: 112233,
            value: 'Smith L.'
        },
        {
            key: 556677,
            value: 'Jones V.'
        },
        {
            key: 778899,
            value: 'Brown G.'
        },
        {
            key: 223344,
            value: 'Devis D.'
        },
        {
            key: 223344,
            value: 'Wilson D.'
        },
        {
            key: 812580,
            value: 'Garcia F.'
        },
        {
            key: 135790,
            value: 'Rodriguez B.'
        },
        {
            key: 667788,
            value: 'Martins E.'
        },
        {
            key: 24689,
            value: 'Tailor I.'
        },
        {
            key: 864201,
            value: 'Sarah N.'
        },
        {
            key: 753192,
            value: 'Jaksom O.'
        },
        {
            key: 445566,
            value: 'White H.'
        }
    ];
    for (key of dataArray) {
        value = dataArray[key];
        console.log(key, value);
    }
}