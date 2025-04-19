main();
function createLinkedList() {
    return {
        headNode: null,
        len: 0
    };
}
function iterateList(list) {
    var node;
    if (!list) {
        console.error('Error: list is undefined');
        return null;
    }
    node = list.headNode;
    while (true) {
        if (node !== null) {
            console.log(node.data);
            node = node.nextNode;
        } else {
            break;
        }
    }
    return node;
}
function main() {
    var list;
    list = createLinkedList();
    pushFront(list, 'Smith A.');
    pushBack(list, 'Shafler B.');
    pushBack(list, 'Shafler B.');
    pushBack(list, 'Shafler B.');
    pushBack(list, 'Wiley D.');
    pushBack(list, 'Brown G.');
    pushBack(list, 'Black H.');
    iterateList(list);
    console.log('-------------------');
    removeVal(list, 'Brown G.');
    console.log('Record Brown G is deleted');
    iterateList(list);
    console.log('-------------------');
    pushVal(list, 'Wiley D.', 'Singer L.');
    iterateList(list);
    console.log('-------------------');
    searchData(list, 'Shafler B.');
    console.log('-------------------');
    removeDupli(list, 'Shafler B.');
    console.log('-------------------');
    iterateList(list);
}
function nodeWithVal(list, val) {
    var node;
    node = list.headNode;
    while (true) {
        if (node.data === val) {
            return node;
        }
        node = node.nextNode;
        if (node !== null) {
            break;
        }
    }
    return null;
}
function pushBack(list, val) {
    var newNode, node;
    newNode = {
        data: val,
        nextNode: null
    };
    if (list.headNode === null) {
        list.headNode = newNode;
    } else {
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
    list.len++;
}
function pushFront(list,val) {
    var node;
    node = {
        data: val,
        nextNode: null
    };
    if (list.headNode !== null) {
        node.nextNode = list.headNode;
    }
    list.headNode = node;
    list.len++;
}
function pushVal(list, targetVal, newVal) {
    var newNode, targetNode;
    newNode = {
        data: newVal,
        nextNode: null
    };
    targetNode = nodeWithVal(list, targetVal);
    if (targetNode) {
        newNode.nextNode = targetNode.nextNode;
        targetNode.nextNode = newNode;
        list.len++;
    }
}
function removeDupli(list, val) {
    var nextNode, node;
    node = list.headNode;
    while (true) {
        if (node !== null && node.data === val) {
            list.headNode = node.nextNode;
            node = list.headNode;
        } else {
            break;
        }
    }
    while (true) {
        if (node !== null) {
            nextNode = node.nextNode;
            if (nextNode !== null && nextNode.data === val && list.len > 1) {
                node.nextNode = nextNode.nextNode;
                list.len--;
            } else {
                node = nextNode;
            }
        } else {
            break;
        }
    }
}
function removeVal(list, val) {
    var node;
    node = list.headNode;
    while (true) {
        if (node !== null && node.data === val) {
            list.headNode = node.nextNode;
            node = list.headNode;
        } else {
            break;
        }
    }
    while (true) {
        if (node.nextNode.data === val) {
            node.nextNode = node.nextNode.nextNode;
        } else {
            node = node.nextNode;
        }
        if (!(node !== null && node.nextNode !== null)) {
            break;
        }
    }
}
function searchData(list, val) {
    var count, node;
    node = list.headNode;
    count = 0;
    while (true) {
        if (node !== null) {
            if (node.data === val) {
                count++;
                node = node.nextNode;
            }
        } else {
            break;
        }
    }
}