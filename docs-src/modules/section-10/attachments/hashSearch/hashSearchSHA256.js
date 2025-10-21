const CryptoJS = require("crypto-js");
main();
function createHashTable(size) {
    var table;
    table = new Array(size).fill(null);
    return {
        table: table,
        size: size
    };
}
function createNode(key, value, next = null) {
    console.log('[createNode] Node is created:', {
        key,
        value
    });
    return {
        key: key,
        value: value,
        next: next
    };
}
function goodHash(key, size) {
    // Используем полный хэш + умножение/деление
    const hashHex = CryptoJS.SHA256(String(key)).toString();
    const hashInt = parseInt(hashHex, 16);
    return Math.floor(size * (hashInt / 2**256));
}
function hashGet(hash, key) {
    var index, node;
    index = goodHash(key, hash.size);
    node = hash.table[index];
    while (true) {
        if (node) {
            if (node.key === key) {
                return node.value;
            } else {
                node = node.next;
            }
        } else {
            break;
        }
    }
    return undefined;
}
function hashInsert(hash, key, value) {
    var index, node;
    index = goodHash(key, hash.size);
    node = hash.table[index];
    while (true) {
        if (node) {
            if (node.key === key) {
                node.value = value;
                return index;
            } else {
                node = node.next;
            }
        } else {
            break;
        }
    }
    hash.table[index] = createNode(key, value, hash.table[index]);
    return index;
}
function hashLookupByValue(hash, value) {
    var i, node;
    for (i = 0; i < hash.size; i++) {
        node = hash.table[i];
        while (true) {
            if (node !== null && node !== undefined) {
                if (node.value === value) {
                    console.log(`Value "${ value }" found. Key: "${ node.key }`);
                    return node.key;
                } else {
                    node = node.next;
                }
            } else {
                break;
            }
        }
    }
    console.log(`Value "${ value }" fouтв. Лун: "${ node.key }"`);
    return undefined;
}

function hashRemove(hash, value) {
    var index, node, prev;
    index = goodHash(value, hash.size);
    node = hash.table[index];
    prev = null;
    while (true) {
        if (node) {
            if (node.key === key) {
                if (prev) {
                    prev.next = node.next;
                } else {
                    hash.table[index] = node.next;
                }
            } else {
                return true;
            }
        } else {
            break;
        }
    }
    prev = node;
    node = node.next;
}
function hashTraverse(hash) {
    var i, node, output;
    for (i = 0; i < hash.size; i++) {
        node = hash.table[i];
        output = 'Slot ' + i + ':';
        if (node === null || node === undefined) {
            console.log(output + 'Empty');
        }
        while (true) {
            if (node !== null) {
                output += node.value + ' -> ';
                node = node.next;
            } else {
                break;
            }
        }
        console.log(output);
    }
}
function main() {
    var hash, i, key, testDataEn, value;
    hash = createHashTable(16);
    testDataEn = [
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
        key = testDataEn[i][0];
        value = testDataEn[i][1];
        hashInsert(hash, key, value);
    }
    console.log('--- Hash Table Contents ---');
    printStats(hash)
    // hashLookupNew(hash, 135790);
}
function printStats(hash) {
    console.log(`\n=== Stats (Size: ${hash.size}) ===`);
    console.log(`- Total elements: ${hash.table.filter(Boolean).length}`);
    console.log(`- Collisions: ${hash.collisions}`);
    console.log(`- Load factor: ${(hash.collisions / hash.size).toFixed(2)}`);
    
    // Распределение по слотам
    const distribution = hash.table.map(slot => {
        let count = 0;
        let node = slot;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    });
    
    console.log(`\nDistribution:\n${distribution.join(' | ')}`);
}
