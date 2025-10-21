main();
function main() {
    var dataMap, i, isDeleted, key, myMap, userName, value;
    myMap = new Map();
    dataMap = [
        [
            123456,
            'John J. Doe'
        ],
        [
            987654,
            'Jane K. Smith'
        ],
        [
            112233,
            'Peter L. Jones'
        ],
        [
            556677,
            'Mary V. Brown'
        ],
        [
            334455,
            'David A. Davis'
        ],
        [
            778899,
            'Susan G. Wilson'
        ],
        [
            223344,
            'Michael D. Garcia'
        ],
        [
            667788,
            'Linda E. Rodriguez'
        ],
        [
            445566,
            'Christopher H. Martinez'
        ],
        [
            889900,
            'Jessica F. Anderson'
        ],
        [
            135790,
            'Matthew B. Taylor'
        ],
        [
            24689,
            'Ashley C. Thomas'
        ],
        [
            975310,
            'Andrew I. Jackson'
        ],
        [
            864201,
            'Sarah N. White'
        ],
        [
            753192,
            'Daniel O. Harris'
        ],
        [
            642083,
            'Brittany P. Lewis'
        ]
    ];
    for (i = 0; i <= 15; i++) {
        key = dataMap[i][0];
        value = dataMap[i][1];
        myMap.set(key, value);
    }
    console.log('All Entries:');
    userName = myMap.get(445566);
    console.log('User 445566:', userName);
    isDeleted = myMap.delete(445566);
    console.log(userName, ' (445566) is deleted.');
}