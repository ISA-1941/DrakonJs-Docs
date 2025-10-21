function main() {
    const myMap = new Map();
    const dataArray = [
        {
            key: 123456,
            value: 'Doe D.'
        },
        {
            key: 987654,
            value: 'Jane K.'
        },
        {
            key: 112233,
            value: 'Smith L.'
        },
        {
            key: 556677,
            value: 'Jones V.'
        },
        {
            key: 778899,
            value: 'Brown G.'
        },
        {
            key: 223344,
            value: 'Devis D.'
        },
        {
            key: 223344,
            value: 'Wilson D.'
        },
        {
            key: 812580,
            value: 'Garcia F.'
        },
        {
            key: 135790,
            value: 'Rodriguez B.'
        },
        {
            key: 667788,
            value: 'Martins E.'
        },
        {
            key: 24689,
            value: 'Tailor I.'
        },
        {
            key: 864201,
            value: 'Sarah N.'
        },
        {
            key: 753192,
            value: 'Jaksom O.'
        },
        {
            key: 445566,
            value: 'White H.'
        }
    ];
  
    for (const { key, value } of dataArray) {
      myMap.set(key, value);
      console.log(`Добавлено: ${key} → ${value}`);
    }
  
    console.log('All Entries:');
    for (const [key, value] of myMap.entries()) {
      console.log(key, value);
    }
const userName = myMap.get(445566);
console.log("User 445566:", userName);
const isDeleted = myMap.delete(445566);
console.log("445566?", isDeleted);
for (const [key, value] of myMap.entries()) {
    console.log(key, value);
  }
}
  main();