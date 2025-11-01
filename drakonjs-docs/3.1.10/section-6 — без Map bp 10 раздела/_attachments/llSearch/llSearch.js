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
    searchData(list, 'Wiley S.');
    removeVal(list, 'Wiley S.');
    iterateList(list);
    console.log('Wiley S. is deleted');
}
function pushBack(list, val) {
    var newNode, node;
    newNode = {
        data: val,
        nextNode: null
    };
    if (list.headNode === null) {
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
function removeVal(list,val) {
    var nextNode, node;
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