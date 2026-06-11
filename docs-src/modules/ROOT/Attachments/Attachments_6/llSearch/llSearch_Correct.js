main();
function createLinkedList() {
    return {
        headNode: null,
        len: 0,
        n: 0
    };
}
function iterateList(list) {
    var node;
    node = list.headNode;
    while (true) {
        if (node !== null) {
            console.log(node.data);
            node = node.nextNode;
        } else {
            break;
        }
    }
}
function main() {
    var list;
    list = createLinkedList();
    pushFront(list, 'Smith J.');
    pushBack(list, 'Brown G.');
    pushBack(list, 'Shafler P.');
    pushBack(list, 'Wiley S.');
    pushBack(list, 'Wiley S.');
    pushBack(list, 'Atallah N.');
    console.log('The linked list is:');
    iterateList(list);
    removeVal(list, 'Shafler P.');
      iterateList(list);
    // searchData(list, 'Brown G.');
    // searchData(list, 'Shafler P.');
    removeDuplicates(list)
    //removeVal(list, 'Wiley S.');
    iterateList(list);
    // console.log('Wiley S. is deleted');
}
function pushBack(list, val) {
    var newNode = {
        data: val,
        nextNode: null
    };
    if (list.headNode === null) {
        list.headNode = newNode;
        return;
    }
    var node = list.headNode;
    while (node.nextNode !== null) {
        node = node.nextNode;
    }
    node.nextNode = newNode;
}
function pushFront(list, val) {
    var node;
    node = {
        data: val,
        nextNode: list.headNode
    };
    list.headNode = node;
    list.len++;
}

function removeVal(list, val) {
  while (list.headNode !== null && list.headNode.data === val) {
    list.headNode = list.headNode.nextNode;
  }

  let node = list.headNode;
  while (node !== null) {
    let nextNode = node.nextNode;
    if (nextNode !== null && nextNode.data === val) {
      node.nextNode = nextNode.nextNode;
    } else {
      node = nextNode;
    }
  }
}

function removeDuplicates(list) {
    if (!list.headNode) return;

    const counter = new Map();
    let current = list.headNode;
    while (current !== null) {
        counter.set(current.data, (counter.get(current.data) || 0) + 1);
        current = current.nextNode;
    }

    const seen = new Set();
    let prev = null;
    let node = list.headNode;

    while (node !== null) {
        const val = node.data;
        if (counter.get(val) > 1 && seen.has(val)) {
            if (prev === null) {
                list.headNode = node.nextNode;
            } else {
                prev.nextNode = node.nextNode;
            }
            node = node.nextNode;
        } else {
            if (counter.get(val) > 1) seen.add(val);
            prev = node;
            node = node.nextNode;
        }
    }
}
function searchData(list, val) {
    var node;
    list.n = 0;
    node = list.headNode;
    if (node.data === val) {
        list.n++;
    }
    while (true) {
        node = node.nextNode;
        if (node !== null) {
            if (node.data === val) {
                list.n++;
            }
        } else {
            break;
        }
    }
    if (list.n !== 0) {
        console.log('The desired value', val, 'occurs', list.n, 'times');
    } else {
        console.log('The desired value', val, 'does not exist');
    }
}