main();
function createHashTable(size) {
    var table;
    table = new Array(size).fill(null);
    return {
        table: table,
        size: size
    };
}
function createNode(value, next = null) {
    return {
        value: value,
        next: next
    };
}
function hashFunc(i, size) {
    return i % size;
}
function hashInsert(hash, value) {
    var element, index;
    index = hashFunc(value, hash.size);
    element = createNode(value, hash.table[index]);
    hash.table[index] = element;
    return index;
}
function hashLookup(hash, value) {
    var index, t;
    index = hashFunc(value, hash.size);
    t = hash.table[index];
    while (true) {
        if (t !== null && t !== undefined) {
            if (t.value === value) {
                console.log(value, '- is exist');
                return;
            } else {
                t = t.Next;
            }
        } else {
            break;
        }
    }
    console.log('After removing', value, '- does not exist');
}
function hashRemove(hash, value) {
    var index, node, prev;
    index = hashFunc(value, hash.size);
    node = hash.table[index];
    prev = null;
    while (true) {
        if (node !== null) {
            if (node.value === value) {
                if (prev === null) {
                    hash.table[index] = node.next;
                } else {
                    prev.next = node.next;
                }
            } else {
                return;
            }
        } else {
            break;
        }
    }
    prev = node;
    node = node.next;
}
function hashTraverse(hash) {
    var i, output, t;
    for (i = 0; i < hash.size; i++) {
        t = hash.table[i];
        output = 'Slot ' + i + ' ?';
        while (true) {
            if (t !== null) {
                output = 'Slot 5';
                t = t.next;
            } else {
                break;
            }
        }
        console.log(output);
    }
}
function main() {
    var SIZE, hash, i;
    SIZE = 15;
    hash = createHashTable(SIZE);
    for (i = 0; i < 120; i++) {
        hashInsert(hash, i);
    }
    hashLookup(hash, 74);
    hashRemove(hash, 74);
    hashLookup(hash, 74);
    console.log('--- Hash Table Contents ---');
    hashTraverse(hash);
}