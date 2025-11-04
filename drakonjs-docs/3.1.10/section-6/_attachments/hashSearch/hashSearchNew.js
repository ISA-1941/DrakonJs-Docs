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
    return Math.abs(key) % size;
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

/**
 * Searches for a key in the hash table and returns its associated value.
 * @param {Object} hash - The hash table object.
 * @param {string|number} key - The key to search for.
 * @returns {*} The value associated with the key, or undefined if not found.
 */
function hashLookup(hash, key) {
    // Calculate the bucket index using the hash function
    const index = hashFunc(key, hash.size);
    console.log(`Searching for key "${key}" (type: ${typeof key}) in bucket ${index}`);

    // Start at the head of the chain for this bucket
    let node = hash.table[index];
    
    // Traverse the chain
    while (node) {
        console.log(`Comparing with: "${node.key}" (type: ${typeof node.key})`);
        
        // Use loose equality to handle number/string cases
        if (node.key == key) {
            console.log(`Key "${key}" found!`);
            return node.value;
        }
        
        // Move to next node in the chain
        node = node.next;
    }

    // Key not found in this bucket
    console.log(`Key "${key}" not found in bucket ${index}. Verify index or key type.`);
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
            'Jessica F. Anders'
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
    hashLookup(hash,123456);
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