const CryptoJS = require('crypto-js');
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
function hashFuncSHA256(key, size) {
    var hashHex, hashInt;
    hashHex = CryptoJS.SHA256(String(key)).toString();
    hashInt = parseInt(hashHex.substring(0, 8), 16);
    return hashInt % size;
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
        while (node !== null && node !== undefined) {
            if (node.value === value) {
                console.log(`Value "${value}" found. Key: "${node.key}"`);
                return node.key;
            }
            node = node.next;
        }
    }
    console.log(`Value "${value}" not found`);
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
    var dataEn, hash, i, key, value;
    hash = createHashTable(16);
    dataEn = [
        [
            519283,
            'Alice R. Cooper'
        ],
        [
            746102,
            'Bob M. Bennett'
        ],
        [
            357908,
            'Carol A. Foster'
        ],
        [
            821674,
            'David S. Hughes'
        ],
        [
            430165,
            'Emma L. Reed'
        ],
        [
            679832,
            'Frank W. Brooks'
        ],
        [
            213547,
            'Grace E. Simmons'
        ],
        [
            958301,
            'Henry T. Peterson'
        ],
        [
            476820,
            'Ivy N. Butler'
        ],
        [
            392645,
            'Jack K. Barnes'
        ],
        [
            568079,
            'Kelly P. Ross'
        ],
        [
            734218,
            'Leo C. Coleman'
        ],
        [
            807541,
            'Mia G. Richardson'
        ],
        [
            169834,
            'Noah D. Patterson'
        ],
        [
            625073,
            'Olivia J. Watson
        ],
        [
            941206, 
            'Paul V. Steven
        ]
    ];
    for (i = 0; i <= 15; i++) {
        key = dataEn[i][0];
        value = dataEn[i][1];
        hashInsert(hash, key, value);
    }
    console.log('--- Hash Table Contents ---');
    printHashTable(hash);
    hashLookupByValue(hash, 'Matthew B. Taylor');
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
function searchHash(hash, key) {
    var index, node;
    index = hashFuncSHA256(key, hash.size);
    console.log(`Lookup "${ key }" → bucket ${ index }`);
    node = hash.table[index];
    if (node !== null) {
        console.log(`Compare: "${ node.key }"`);
    }
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