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
    console.log('Shafler P is deleted');
    pushFront(list, 'Smith J.');
    pushBack(list, 'Brown G.');
    pushBack(list, 'Shafler P.');
    pushBack(list, 'Wiley S.');
    pushBack(list, 'Wiley S.');
    pushBack(list, 'Atallah N.');
    iterateList(list);
    removeVal(list, 'Shafler P.');
    console.log('Shafler P is deleted');
    console.log('After W deletion ');
    iterateList(list);
    removeDuplicates(list);
    console.log('After W deletion ');
    iterateList(list);
}
function pushBack(list, val) {
    var newNode, node;
    newNode = {
        data: val,
        nextNode: null
    };
    if (list.headNode === null) {
        list.headNode = newNode;
        return;
    }
    node = list.headNode;
    while (true) {
        if (node.nextNode !== null) {
            node = node.nextNode;
        } else {
            break;
        }
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
function removeDuplicates(list) {
    var counter, current, node, prev, seen, val;
    if (!list.headNode) {
        return;
    }
    counter = new Map();
    current = list.headNode;
    while (true) {
        if (current !== null) {
            counter.set(current.data, (counter.get(current.data) || 0) + 1);
            current = current.nextNode;
        } else {
            break;
        }
    }
    seen = new Set();
    prev = null;
    node = list.headNode;
    while (true) {
        if (node !== null) {
            val = node.data;
            if (counter.get(val) > 1 && seen.has(val)) {
                if (prev === null) {
                    list.headNode = node.nextNode;
                } else {
                    prev.nextNode = node.nextNode;
                }
                node = node.nextNode;
            } else {
                if (counter.get(val) > 1) {
                    seen.add(val);
                }
                prev = node;
                node = node.nextNode;
            }
        } else {
            break;
        }
    }
}
function removeVal(list,val) {
    var nextNode, node;
    while (true) {
        if (list.headNode !== null && list.headNode.data === val) {
            list.headNode = list.headNode.nextNode;
        } else {
            break;
        }
    }
    node = list.headNode;
    while (true) {
        if (node !== null) {
            nextNode = node.nextNode;
            if (nextNode !== null && nextNode.data === val) {
                node.nextNode = nextNode.nextNode;
            } else {
                node = nextNode;
            }
        } else {
            break;
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