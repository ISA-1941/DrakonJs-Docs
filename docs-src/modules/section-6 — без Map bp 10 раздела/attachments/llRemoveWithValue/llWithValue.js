function createLinkedList() {
  return {
      headNode: null,
      len: 0
  };
}
  
    function nodeWithVal(list, val) {
      let current = list.headNode;
      while (current !== null) {
          if (current.data === val) {
              return current;
          }
          current = current.nextNode;
      }
      return null;
  }
  
  function pushBack(list, val) {
    const newNode = { data: val, nextNode: null };
    if (list.headNode === null) {
        list.headNode = newNode;
    } else {
        let current = list.headNode;
        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        current.nextNode = newNode;
    }
    list.len++;
}
  
    function pushVal(list, targetVal, newVal) {
      const newNode = { data: newVal, nextNode: null };
      const targetNode = nodeWithVal(list, targetVal);
      
      if (targetNode) {
          newNode.nextNode = targetNode.nextNode;
          targetNode.nextNode = newNode;
          list.len++;
      }
  }
  
  function removeDupli(list, val) {
    // Удаление дубликатов в начале списка
    let node = list.headNode;
    while (node !== null && node.data === val) {
        list.headNode = node.nextNode;
        node = list.headNode;
    }

    // Удаление дубликатов в середине/конце
    while (node !== null) {
        const nextNode = node.nextNode;
        if (nextNode !== null && nextNode.data === val && list.len > 1) {
            node.nextNode = nextNode.nextNode;
            list.len--;
        } else {
            node = nextNode;
        }
    }

    // Добавление "Shafler B." в конец
    pushBack(list, "Shafler B.");
}

function pushFront(list, val) {
  // item 160
  const node = { data: val, nextNode: null };
  // item 161
  if (list.headNode !== null) {
      // item 164
      node.nextNode = list.headNode;
  }
  // item 165
  list.headNode = node;
  // item 166
  list.len++;
}

function removeVal(list, val) {
  // item 197
  let node = list.headNode;
  
  // Удаление в начале списка
  while (true) {
      // item 212
      if (node !== null && node.data === val) {
          // item 200
          list.headNode = node.nextNode;
          // item 215
          node = list.headNode;
      } else {
          break;
      }
  }
  
  // Удаление в середине/конце
  while (true) {
      // item 216
      if (node !== null) {
          // item 203
          const nextNode = node.nextNode;
          // item 204
          if (nextNode !== null && nextNode.data === val) {
              // item 207
              node.nextNode = nextNode.nextNode;
          } else {
              // item 208
              node = nextNode;
          }
      } else {
          break;
      }
  }
  
  // item 209
  return node;
}

function searchData(list, val) {
  // item 243
  let node;
  let count = 0; // аналог list.n
  
  // item 2440001
  node = list.headNode;
  while (true) {
      // item 2440002
      if (node !== null) {
          // item 246
          if (node.data === val) {
              // item 249
              count++;
          }
          // item 2440003
          node = node.nextNode;
      } else {
          break;
      }
  }
  
  // item 250
  if (count !== 0) {
      // item 254
      console.log("Desire value", val, "occurs", count, "times");
  } else {
      // item 253
      console.log("Desire value", val, "is absent");
  }
}

function iterateList(list) {
    if (!list) {
        console.error("Error: list is undefined");
        return null;
    }

    let node = list.headNode;
    while (node !== null) {
        console.log(node.data);
        node = node.nextNode;
    }
    return node;
}
  
  // Пример использования
  var list = createLinkedList()
  pushFront(list,"Smith A.")
  pushBack(list, "Shafler B.")
  pushBack(list, "Shafler B.")
  pushBack(list, "Shafler B.")
  pushBack(list, "Wiley D.")
  pushBack(list, "Brown G.")
  pushBack(list, "Black H.")
  iterateList(list)
  console.log("-------------------")
  removeVal(list,"Brown G.")
  console.log("Record Brown G is deleted")
  iterateList(list)
  console.log("-------------------")
  pushVal(list, "Wiley D.", "Singer L.")
  iterateList(list)
  console.log("-------------------")
  searchData(list, "Shafler B.")
  console.log("-------------------")
  removeDupli(list, "Shafler B.")
  console.log("-------------------")
  iterateList(list)