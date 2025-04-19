main();
function createHashtable(size) {
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
    const index = hashFunc(value, hash.size);
    let t = hash.table[index];
  
    while (t !== null && t !== undefined) {
      if (t.value === value) {
        console.log(value, '- is exist');
        return;
      }
      t = t.next;
    }
  
    console.log('After removing', value, '- does not exist');
  }
  

function hashRemove(hash, value) {
    const index = hashFunc(value, hash.size);
    let node = hash.table[index];
    let prev = null;
  
    while (node !== null) {
      if (node.value === value) {
        if (prev === null) {
          // Удаляем первый элемент в цепочке
          hash.table[index] = node.next;
        } else {
          // Удаляем из середины
          prev.next = node.next;
        }
        return;
      }
      prev = node;
      node = node.next;
    }
  }
  
  function hashTraverse(hash) {
    for (let i = 0; i < hash.size; i++) {
      let t = hash.table[i];
      let output = 'Slot ' + i + ' ?';
  
      while (t !== null) {
        output = 'Slot 5';
        t = t.next;
      }
  
      console.log(output);
    }
  }
function main() {
    var SIZE, hash, i;
    SIZE = 15;
    hash = createHashtable(SIZE);
    for (i = 0; i < 120; i++) {
        hashInsert(hash, i);
    }
    hashLookup(hash, 74);
    hashRemove(hash, 74);
    hashLookup(hash, 74);
    console.log('--- Hash table Contents ---');
    hashTraverse(hash);
}