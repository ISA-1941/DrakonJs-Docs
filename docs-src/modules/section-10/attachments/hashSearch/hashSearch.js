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
function hashFunc(key, size) {
    var hash, i, keyStr;
    keyStr = String(key);
    hash = 0;
    for (i = 0; i < keyStr.length; i++) {
        hash = Math.imul(hash, 32) - hash + keyStr.charCodeAt(i);
    }
    return Math.abs(hash) % size;
}
function hashGet(hash, key) {
    var index, node;
    index = hashFunc(key, hash.size);
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
    index = hashFunc(key, hash.size);
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
function hashLookupNew(hash, key) {
    var index, node;
    index = hashFunc(key, hash.size);
    console.log(`Lookup "${ key }" → bucket ${ index }`);
    node = hash.table[index];
    console.log(`Compare: "${ node.key }"`);
    while (true) {
        if (node == null) {
            break;
        } else {
            if (node.key === key) {
                return node.value;
            } else {
                node = node.next;
            }
        }
    }
    console.log(`Key "${ key }" is not found in hash-table`);
    return undefined;
}
function hashRemove(hash, value) {
    var index, node, prev;
    index = hashFunc(value, hash.size);
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
    hash = createHashTable(64);
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
    printHashTable(hash);
    hashLookupNew(hash, 135790);
    hashLookupByValue(hash, 'Andrew I. Jackson');
}
function printHashTable(hash) {
    var i, node, slotContent;
    console.log('--- Hash Table Contents (Key -> Value) ---');
    for (i = 0; i < hash.size; i++) {
        node = hash.table[i];
        slotContent = [];
        while (true) {
            if (node) {
                slotContent.push(`${ node.key } -> ${ node.value }`);
                node = node.next;
            } else {
                break;
            }
        }
        console.log(`Slot ${ i }: ${ slotContent.join(' -> ') || 'Empty' }`);
    }
}