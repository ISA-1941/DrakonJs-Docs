function createNode(data, parent = null) {
    return {
        data: data,
        colour: true, // true — red, false — black
        left: null,
        right: null,
        parent: parent
    };
}

function createRBTree() {
    const nullNode = {
        data: 0,
        colour: false, 
        left: null,
        right: null,
        parent: null
    };

    return {
        root: nullNode,
        nullNode: nullNode
    };
}
function insertNode(tree, node, data) {
    const NIL = tree.nullNode;

    if (node === NIL) {
        return createNode(data, NIL);
    }

    if (data < node.data) {
        node.left = insertNode(tree, node.left, data);
        node.left.parent = node;
    } else if (data > node.data) {
        node.right = insertNode(tree, node.right, data);
        node.right.parent = node;
    } else {
        throw new Error("Unexpected duplicate value: " + data);
    }

    return node;
}
function Insert(tree, data) {
    tree.root = insertNode(tree, tree.root, data);

    const inserted = findNode(tree.root, data);
    fixRedRed(tree, inserted);
}

function findNode(node, value) {
    if (!node || node.data === undefined) return null;
    if (value === node.data) return node;
    if (value < node.data) return findNode(node.left, value);
    return findNode(node.right, value);
}
function fixRedRed(tree,x) {
    var LL, LR, RL, RR, grandparent, mid, parent, uncle;
    if (x === tree.root) {
        x.colour = false;
        return;
    }
    parent = x.parent;
    if (parent.colour === false) {
        return;
    }
    grandparent = parent.parent;
    uncle = getUncle(tree, x);
    if (uncle !== tree.nullNode && uncle.colour === true) {
        parent.colour = false;
        uncle.colour = false;
        grandparent.colour = true;
        fixRedRedIIN(tree, grandparent);
        return true;
    }
    LL = parent === grandparent.left && x === parent.left;
    LR = parent === grandparent.left && x === parent.right;
    RL = parent === grandparent.right && x === parent.left;
    RR = parent === grandparent.right && x === parent.right;
    mid = null;
    if (LL) {
        mid = rotateRight(tree, grandparent);
        mid.colour = false;
        grandparent.colour = true;
    } else {
        if (LR) {
            mid = rotateLeftRight(tree, grandparent);
            mid.colour = false;
            mid.left.colour = true;
        } else {
            if (RL) {
                mid = rotateRightLeft(tree, grandparent);
                mid.colour = false;
                mid.left.colour = true;
                mid.right.colour = true;
            } else {
                if (RR) {
                    mid = rotateLeft(tree, grandparent);
                    mid.colour = false;
                    grandparent.colour = true;
                } else {
                    console.log('Unclassified rotation case.');
                    return;
                }
            }
        }
    }
    if (grandparent === tree.root) {
        tree.root = mid;
    }
}
function main() {
    var tree, val, values;
    tree = createTree();
    values = [
        21,
        17,
        15,
        13,
        11,
        9,
        7,
        5,
        3
    ];
    for (val of values) {
        Insert(tree, val);
        console.log('val =',val);
    }
    console.log("Is tree.root nullNode?", tree.root === tree.nullNode);
if (tree.root !== tree.nullNode) {
    console.log("Root value:", tree.root.val, "Root color:", tree.root.colour);
}
    console.log('Red-Black Tree:');
    printTreeNode(tree, tree.root, '', false);
    // deleteNodeAI(tree, tree.root, 17);
    //console.log('After deleting ');
    //printTreeNode(tree, tree.root, '', false);
}
function minimum(tree, node) {
    var node;
    while (true) {
        if (node.left !== tree.nullNode) {
            node = node.left;
        } else {
            break;
        }
    }
    return node;
}

