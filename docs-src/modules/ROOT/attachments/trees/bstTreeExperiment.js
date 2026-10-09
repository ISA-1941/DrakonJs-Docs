// main();
function createBstTree() {
    return { root: null };
}
function createNode(value) {
    if (value === undefined) {
        throw new Error('Node value must be defined');
    }
    return {
        value: value,
        left: null,
        right: null
    };
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
function inOrder(node, result) {
    if (node === null) {
        return;
    }
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
}
function insertNode(tree,value) {
    var current, newNode;
    newNode = createNode(value);
    if (tree.root === null) {
        tree.root = newNode;
        return;
    }
    current = tree.root;
    while (true) {
        if (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        } else {
            break;
        }
    }
}
function main() {
    var found, result, tree, val, values;
    tree = createBstTree();
    values = [
        5, 8, 23, 42, 4, 16, 15, 9, 11, 7, 3, 2, 1

    ];
    for (val of values) {
        insertNode(tree, val);
    }
    console.dir(tree, { depth: null });
    result = [];
    preOrder(tree.root, result);
    result = [];
    inOrder(tree.root, result);
    console.log('inOrder:', result);
    result = [];
    postOrder(tree.root, result);
    found = findNode(tree.root, 42);
    if (found) {
        console.log('Found:', found.value);
    } else {
        console.log('Not found');
    }
    tree.root = removeNode(tree.root, 42);
    found = findNode(tree.root, 42);
    if (found) {
        console.log('Found:', found.value);
    } else {
        console.log('Not found');
    }
}
function postOrder(node, result) {
    if (node === null) {
        return;
    }
    postOrder(node.left, result);
    postOrder(node.right, result);
    result.push(node.value);
}
function preOrder(node, result) {
    if (node === null) {
        return;
    }
    result.push(node.value);
    preOrder(node.left, result);
    preOrder(node.right, result);
}
function removeNode(node, value) {
    var minNode;
    if (node === null) {
        return null;
    }
    if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
    }
    if (value > node.value) {
        node.right = removeNode(node.right, value);
        return node;
    }
    if (node.left === null && node.right === null) {
        return null;
    }
    if (node.right === null && node.left !== null) {
        return node.left;
    }
    if (node.left === null && node.right !== null) {
        return node.right;
    }
    if (node.right !== null && node.left !== null) {
        minNode = findMin(node.right);
        node.value = minNode.value;
        node.right = removeNode(node.right, minNode.value);
        return node;
    }
}
function printBstTree(node, prefix = "", isLeft = true) {
    if (node === null) {
        return "";
    }

    let result = "";

    if (node.right !== null) {
        result += printBstTree(
            node.right,
            prefix + (isLeft ? "│   " : "    "),
            false
        );
    }

    result += prefix
        + (isLeft ? "└── " : "┌── ")
        + node.value + "\n";

    if (node.left !== null) {
        result += printBstTree(
            node.left,
            prefix + (isLeft ? "    " : "│   "),
            true
        );
    }

    return result;
}
