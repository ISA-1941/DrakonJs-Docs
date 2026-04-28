main();
function createNode(value) {
    return {
        value,
        left: null,
        right: null
    };
}
function createavlTree() {
    return { root: null };
}
function deleteNode(node, value) {
    var successor;
    if (node === null) {
        return null;
    }
    if (value < node.value) {
        node.left = deleteNode(node.left, value);
    } else {
        if (value > node.value) {
            node.right = deleteNode(node.right, value);
        } else {
            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }
            successor = node.right;
            while (true) {
                if (successor.left) {
                    successor = successor.left;
                } else {
                    break;
                }
            }
            node.value = successor.value;
            node.right = deleteNode(node.right, successor.value);
        }
    }
    updateHeight(node);
    return rebalance(node);
}
function findMin(node) {
    while (true) {
        if (node.left !== null) {
            node = node.left;
        } else {
            break;
        }
    }
    return node;
}
function findNode(node, value) {
    if (node === null) {
        return null;
    }
    if (value === node.value) {
        return node;
    }
    if (value < node.value) {
        return findNode(node.left, value);
    } else {
        return findNode(node.right, value);
    }
}
function getBalance(node) {
    return height(node.left) - height(node.right);
}
function height(node) {
    if (node) {
        return node.height;
    } else {
        return 0;
    }
}
function inOrder(node, result) {
    if (node === null) {
        return;
    }
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
}
function insertNode(node, value) {
    if (node === null) {
        return createNode(value);
    }
    if (node.value === value) {
        throw new Error('Duplicated node: ' + value);
    }
    if (value < node.value) {
        node.left = insertNode(node.left, value);
    } else {
        node.right = insertNode(node.right, value);
    }
    return rotateInsert(node);
}
function isLeaf(node) {
    return node.left === null && node.right === null;
}
function main() {
    var result, tree, value, values;

tree = createavlTree();
    values = [
        1,
        2,
        5,
        6,
        8,
        11,
        13,
        15,
        17,
        19,
        21
    ];
    for (value of values) {
        tree.root = insertNode(tree.root, value);
    }
    result = [];
    inOrder(tree.root, result);
    console.log('In-order:', result);
    tree.root = deleteNode(tree.root, 5);
    result = [];
    inOrder(tree.root, result);
    console.log('In-order after deleting:', result);
}
function rebalance(node) {
    var balance;
    if (!node) {
        return null;
    }
    balance = getBalance(node);
    if (balance > 1) {
        if (getBalance(node.left) < 0) {
            ode.left = rotateLeft(node.left);
        }
        return rotateRight(node);
    }
    if (balance < -1) {
        if (getBalance(node.right) > 0) {
            node.right = rotateRight(node.right);
        }
        return rotateLeft(node);
    }
    return node;
}
function rotateInsert(node, value) {
    var balance;
    updateHeight(node);
    balance = getBalance(node);
    if (balance > 1 && value < node.left.value) {
        return rotateRight(node);
    }
    if (balance < -1 && value > node.right.value) {
        return rotateLeft(node);
    }
    if (balance > 1 && value > node.left.value) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }
    if (balance < -1 && value < node.right.value) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }
    return node;
}
function rotateLeft(nd) {
    var t1, y;
    y = nd.right;
    t1 = y.left;
    y.left = nd;
    nd.right = t1;
    updateHeight(nd);
    updateHeight(y);
    return y;
}
function rotateRight(nd) {
    var t2, y;
    y = nd.left;
    t2 = y.right;
    y.right = nd;
    nd.left = t2;
    updateHeight(nd);
    updateHeight(y);
    return y;
}
function updateHeight(node) {
    node.height = 1 + Math.max(height(node.left), height(node.right));
}