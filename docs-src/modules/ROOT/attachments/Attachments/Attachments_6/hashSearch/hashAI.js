function createHashTable() {
    const table = {};
  
    function hash(key) {
      let hashValue = 0;
      for (let i = 0; i < key.length; i++) {
        hashValue += key.charCodeAt(i);
      }
      return hashValue % 37;
    }
  
    function set(key, value) {
      const index = hash(key);
      if (!table[index]) {
        table[index] = [];
      }
      const existingPair = table[index].find(pair => pair.key === key);
      if (existingPair) {
        existingPair.value = value;
      } else {
        table[index].push({ key, value });
      }
    }
  
    function get(key) {
      const index = hash(key);
      if (table[index]) {
        const pair = table[index].find(pair => pair.key === key);
        return pair ? pair.value : undefined;
      }
      return undefined;
    }
  
    function remove(key) {
      const index = hash(key);
      if (table[index]) {
        const pairIndex = table[index].findIndex(pair => pair.key === key);
        if (pairIndex !== -1) {
          table[index].splice(pairIndex, 1);
          return true;
        }
      }
      return false;
    }
  
    return { set, get, remove };
  }
  
  // Создаём таблицу
  const studentTable = createHashTable();
  
  // Старые данные
  studentTable.set("Alice", 25);
  studentTable.set("Bob", 30);
  
  // Новые данные
  studentTable.set("Mike", 31);
  studentTable.set("Nick", 29);
  studentTable.set("Steve", 27);
  
  // Проверяем
  console.log(studentTable.get("Mike"));  // 31
  console.log(studentTable.get("Nick"));  // 29
  console.log(studentTable.get("Steve")); // 27