const CryptoJS = require('crypto-js');

// 1. Хэш-функция с полным использованием SHA-256
function hashFuncSHA256(key, size) {
    const hashHex = CryptoJS.SHA256(String(key)).toString();
    const hashInt = parseInt(hashHex, 16); // Используем ВЕСЬ хэш
    return Math.abs(hashInt) % size;
}

// 2. Создание хэш-таблицы
function createHashTable(size) {
    return {
        table: new Array(size).fill(null),
        size: size,
        collisions: 0 // Счётчик коллизий
    };
}

// 3. Вставка с подсчётом коллизий
function hashInsert(hash, key, value) {
    const index = hashFuncSHA256(key, hash.size);
    let node = hash.table[index];
    
    if (node) hash.collisions++; // Фиксируем коллизию
    
    hash.table[index] = {
        key,
        value,
        next: node
    };
    return index;
}

// 4. Анализ распределения
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

// 5. Тестовые данные (ваши данные)
const testDataEn = [
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
    [642083, "Brittany P. Lewis"],
];

// 6. Запуск с разными размерами таблицы
function test(size) {
    const hash = createHashTable(size);
    testDataEn.forEach(([key, value]) => hashInsert(hash, key, value));
    printStats(hash);
}

// 7. Тестируем для разных размеров
test(16); // Маленькая таблица
test(32); // Оптимальный размер
test(64); // Большая таблица