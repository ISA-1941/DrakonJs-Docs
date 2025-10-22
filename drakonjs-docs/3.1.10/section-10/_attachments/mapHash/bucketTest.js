// Тест: вставка 1000 случайных ключей
const myMap = new Map();
for (let i = 0; i < 1000; i++) {
  myMap.set(Math.random().toString(36).slice(2), i);
}
console.log(myMap.size); 
console.log("size = ", myMap.size);

const userName = myMap.get(445566);
console.log("User 445566:", userName);