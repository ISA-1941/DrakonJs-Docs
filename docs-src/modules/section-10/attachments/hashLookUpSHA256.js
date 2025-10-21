const CryptoJS = require('crypto-js');

function createHashTable(size) {
    return {
        table: new Array(size).fill(null),
        size: size
    };
}

function createNode(key, value, next = null) {
    console.log('[createNode] Node is created:', { key, value });
    return { key, value, next };
}

function hashFuncSHA256(key, size) {
    const hashHex = CryptoJS.SHA256(String(key)).toString();
    const hashInt = parseInt(hashHex, 16); // Используем ВЕСЬ хэш
    return Math.abs(hashInt) % size;
}

function hashInsert(hash, key, value) {
    const index = hashFuncSHA256(key, hash.size);
    let node = hash.table[index];
    let prev = null;

    while (node) {
        if (node.key === key) {
            node.value = value;
            return index;
        }
        prev = node;
        node = node.next;
    }

    const newNode = createNode(key, value, hash.table[index]);
    hash.table[index] = newNode;
    return index;
}

function hashGet(hash, key) {
    const index = hashFuncSHA256(key, hash.size);
    let node = hash.table[index];

    while (node) {
        if (node.key === key) return node.value;
        node = node.next;
    }
    return undefined;
}

function hashLookupNew(hash, key) {
    const index = hashFuncSHA256(key, hash.size);
    console.log(`Lookup "${key}" → bucket ${index}`);
    let node = hash.table[index];

    while (node) {
        if (node.key === key) return node.value;
        node = node.next;
    }

    console.log(`Key "${key}" not found`);
    return undefined;
}

function hashRemove(hash, key) {
    const index = hashFuncSHA256(key, hash.size);
    let node = hash.table[index];
    let prev = null;

    while (node) {
        if (node.key === key) {
            if (prev) {
                prev.next = node.next;
            } else {
                hash.table[index] = node.next;
            }
            return true;
        }
        prev = node;
        node = node.next;
    }
    return false;
}

function printHashTable(hash) {
    console.log('--- Hash Table Contents (Key -> Value) ---');
    for (let i = 0; i < hash.size; i++) {
        let node = hash.table[i];
        const slotContent = [];
        
        while (node) {
            slotContent.push(`${node.key} -> ${node.value}`);
            node = node.next;
        }
        
        console.log(`Slot ${i}: ${slotContent.join(' → ') || 'Empty'}`);
    }
}

function main() {
    const hash = createHashTable(20);
    const dataEn = [
        [123456, "John J. Doe"],
        [987654, "Jane K. Smith"],
        [112233, "Peter L. Jones"],
        [556677, "Mary V. Brown"],
        [334455, "David A. Davis"],
        [778899, "Susan G. Wilson"],
        [223344, "Michael D. Garcia"],
        [667788, "Linda E. Rodriguez"],
        [445566, "Christopher H. Martinez"],
        [889900, "Jessica F. Anderson"],
        [135790, "Matthew B. Taylor"],
        [24689, "Ashley C. Thomas"],
        [975310, "Andrew I. Jackson"],
        [864201, "Sarah N. White"],
        [753192, "Daniel O. Harris"],
        [642083, "Brittany P. Lewis"]
    ];

    dataEn.forEach(([key, value]) => {
        hashInsert(hash, key, value);
    });

    console.log('\n--- Initial Hash Table ---');
    printHashTable(hash);

    console.log('\n--- Lookup Tests ---');
    console.log('Lookup 135790:', hashLookupNew(hash, 135790));
    console.log('Lookup 999999:', hashLookupNew(hash, 999999));

    console.log('\n--- Remove Test ---');
    hashRemove(hash, 556677);
    console.log('After removing key 556677:');
    printHashTable(hash);
}

main();