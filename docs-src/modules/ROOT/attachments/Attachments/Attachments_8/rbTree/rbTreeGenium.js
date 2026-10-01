// rb-tree.js — unified functional RB-tree with pretty console print

// Node factory: key, color ('R'|'B'), left, right, parent
function makeNode(key = null, color = "B", left = null, right = null, parent = null) {
    return { key, color, left, right, parent };
}

// Tree factory with sentinel nullNode
function makeRBTree() {
    const nullNode = {};
    nullNode.key = null;
    nullNode.color = "B";
    nullNode.left = nullNode;
    nullNode.right = nullNode;
    nullNode.parent = nullNode;

    return { root: nullNode, nullNode };
}

// BST insert (creates node and links it)
function bstInsert(tree, key) {
    let y = tree.nullNode;
    let x = tree.root;

    while (x !== tree.nullNode) {
        y = x;
        if (key < x.key) x = x.left;
        else x = x.right;
    }

    const newNode = makeNode(key, "R", tree.nullNode, tree.nullNode, y);

    if (y === tree.nullNode) {
        tree.root = newNode; // tree was empty
    } else if (key < y.key) {
        y.left = newNode;
    } else {
        y.right = newNode;
    }

    return newNode;
}

// Rotations
function rotateLeft(tree, x) {
    const y = x.right;
    x.right = y.left;
    if (y.left !== tree.nullNode) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === tree.nullNode) tree.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
}

function rotateRight(tree, x) {
    const y = x.left;
    x.left = y.right;
    if (y.right !== tree.nullNode) y.right.parent = x;
    y.parent = x.parent;
    if (x.parent === tree.nullNode) tree.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
}

// fix cases for insertion (CLRS-style)
function fixCase1(tree, node) {
    // parent is black -> nothing to do
    return tree;
}

function fixCase2(tree, node) {
    const parent = node.parent;
    const grand = parent.parent;
    const uncle = (parent === grand.left) ? grand.right : grand.left;

    parent.color = 'B';
    uncle.color = 'B';
    grand.color = 'R';

    return fixInsert(tree, grand);
}

function fixCase3(tree, node) {
    let parent = node.parent;
    let grand = parent.parent;

    // convert inner to outer
    if (node === parent.right && parent === grand.left) {
        rotateLeft(tree, parent);
        node = node.left;
    } else if (node === parent.left && parent === grand.right) {
        rotateRight(tree, parent);
        node = node.right;
    }

    parent = node.parent;
    grand = parent.parent;

    parent.color = 'B';
    grand.color = 'R';

    if (node === parent.left && parent === grand.left) {
        rotateRight(tree, grand);
    } else {
        rotateLeft(tree, grand);
    }

    return tree;
}

// Dispatcher for insertion fixes
function fixInsert(tree, node) {
    // If parent is sentinel (root), parent.color will be 'B', so nothing to do
    const parent = node.parent;
    if (parent === tree.nullNode) {
        tree.root.color = 'B';
        return tree;
    }

    if (parent.color === 'B') {
        return fixCase1(tree, node);
    }

    const grand = parent.parent;
    const uncle = (parent === grand.left) ? grand.right : grand.left;

    if (uncle.color === 'R') {
        return fixCase2(tree, node);
    }

    return fixCase3(tree, node);
}

// Public insert
function insert(tree, key) {
    const node = bstInsert(tree, key);
    fixInsert(tree, node);
    // ensure root is black
    tree.root.color = 'B';
    return tree;
}

// Pretty color print — accepts tree and node (start with tree.root)
function printTree(tree, node = tree.root, indent = "", isLeft = true) {
    const RED = "\x1b[31m";
    const BLACK = "\x1b[37m";
    const GRAY = "\x1b[90m";
    const RESET = "\x1b[0m";

    if (node === tree.nullNode) {
        console.log(indent + (isLeft ? "L── " : "R── ") + GRAY + "NIL" + RESET);
        return;
    }

    const colorCode = node.color === 'R' ? RED : BLACK;
    console.log(indent + (isLeft ? "L── " : "R── ") + colorCode + `${node.key}(${node.color})` + RESET);

    const indentChild = indent + (isLeft ? "│   " : "    ");
    printTree(tree, node.left, indentChild, true);
    printTree(tree, node.right, indentChild, false);
}

// minimal search (used later by delete)
function search(tree, key) {
    let node = tree.root;
    while (node !== tree.nullNode) {
        if (key === node.key) return node;
        node = key < node.key ? node.left : node.right;
    }
    return tree.nullNode;
}

// Main: build tree and print
function main() {
    const tree = makeRBTree();

    const values = [
        5,10,15,20,25,30,35,40,45,50,
        55,60,65,70,75,80,85,90,95
    ];

    for (const v of values) {
        insert(tree, v);
    }

    console.log("\nTree after inserts:\n");
    printTree(tree, tree.root);

    // test search
    // console.log("search 55 ->", search(tree, 55).key);

    return tree;
}

// Run when executed by node
if (typeof require !== "undefined" && require.main === module) {
    main();
}

