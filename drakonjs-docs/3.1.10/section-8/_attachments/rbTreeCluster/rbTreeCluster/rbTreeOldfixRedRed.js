main();
function findInsertionPoint(tree, node, data, parent) {
    if (node === tree.nullNode) {
        return { parent: parent, direction: data < parent.data ? 'left' : 'right' };
    }
    if (data < node.data) {
        return findInsertionPoint(tree, node.left, data, node);
    } else if (data > node.data) {
        return findInsertionPoint(tree, node.right, data, node);
    } else {
        return { node: node, duplicate: true }; // Found duplicate
    }
}

// And then your Insert function would call it like this:
function Insert(tree, data) {
    var NIL = tree.nullNode;

    // Handle empty tree first
    if (tree.root === NIL) {
        tree.root = createNode(data, false, NIL, NIL, NIL); // Root is BLACK
       //console.log(`First node ${tree.root.data} is now root (BLACK).`);
        // No fixRedRed needed for the very first node, it's always black.
        return; // Exit here
    }

    // Find the insertion point using a separate helper
    var insertionInfo = findInsertionPoint(tree, tree.root, data, NIL);

    if (insertionInfo.duplicate) {
        console.log('Duplicate value: ' + data);
        return; // No insertion, no fix needed
    }

    var parent = insertionInfo.parent;
    var direction = insertionInfo.direction;

    // Create the new node, always RED initially
    var newNode = createNode(data, true, parent, NIL, NIL);

    // Attach the new node to its parent
    if (direction === 'left') {
        parent.left = newNode;
    } else {
        parent.right = newNode;
    }

    //console.log(`--- Calling fixRedRed for node ${newNode.data} (color: ${newNode.colour ? 'RED' : 'BLACK'}) ---`);
    fixRedRed(tree, newNode); // Call fixRedRed with the ACTUALLY new node!

    // Ensure root is black after all operations
    tree.root.colour = false;
}

function createNode(data, colour, parent, left, right) {
return {
data: data,
colour: colour, // true for RED, false for BLACK
parent: parent,
left: left,
right: right
};
}

function createTree() {
    var nullNode;
    nullNode = {
        data: 0,
        colour: false,
        left: null,
        right: null,
        parent: null
    };
    nullNode.left = nullNode;
    nullNode.right = nullNode;
    nullNode.parent = nullNode;
    return {
        root: nullNode,
        nullNode: nullNode
    };
}

function fixDoubleBlack(tree, x) {
    var x;
    while (true) {
        if (x !== tree.root && x.colour === false) {
            x = fixDoubleBlackStep(tree, x);
        } else {
            break;
        }
    }
    x.colour = false;
}
function fixDoubleBlackStep(tree, x) {
    var parent, sibling;
    parent = x.parent;
    sibling = getSibling(x);
    if (sibling.colour === true) {
        sibling.colour = false;
        parent.colour = true;
        if (x === parent.left) {
            rotateLeft(tree, parent);
        } else {
            rotateRight(tree, parent);
        }
        sibling = getSibling(x);
    }
    if (sibling.left.colour === false && sibling.right.colour === false) {
        sibling.colour = true;
        return parent;
    } else {
        if (x === parent.left && sibling.right.colour === false) {
            sibling.left.colour = false;
            sibling.colour = true;
            rotateRight(tree, sibling);
            sibling = getSibling(x);
        } else {
            if (x === parent.right && sibling.left.colour === false) {
                sibling.right.colour = false;
                sibling.colour = true;
                rotateLeft(tree, sibling);
                sibling = getSibling(x);
            }
        }
    }
    sibling.colour = parent.colour;
    parent.colour = false;
    if (x === parent.left) {
        sibling.right.colour = false;
        rotateLeft(tree, parent);
    } else {
        sibling.left.colour = false;
        rotateRight(tree, parent);
    }
    return tree.root;
}

function fixRedRed(tree, x) {
    var LL, LR, RL, RR, grandparent, rootSubtree, parent, uncle;
//console.log('fixRR_1--> x = ',x );
    // Rule 1: Root must be BLACK.
    if (x === tree.root) {
        x.colour = false;
        return;
    }
    parent = x.parent;

    // Rule 4: If parent is BLACK, no red-red violation.
    if (parent.colour === false) {
        return;
    }

    // Now, x is RED and parent is RED (violation detected).
    grandparent = parent.parent;

    // Critical check: If grandparent is NIL (meaning parent is the root).
    // If parent is already BLACK, the initial check `parent.colour === false` would have returned.
    // So, if we reach here and parent is root, it must be RED. Fix it to BLACK.
    if (grandparent === tree.nullNode) {
        parent.colour = false; // The root (parent) must be black.
        return;
    }

    uncle = getUncle(tree, x);

    // Case 2: Uncle is RED
    if (uncle.colour === true) { // No need for uncle !== tree.nullNode because getUncle always returns node or nullNode
        parent.colour = false;
        uncle.colour = false;
        grandparent.colour = true;
        fixRedRed(tree, grandparent); // Recursively fix from grandparent
        return; // No need to return true
    }

    // Case 3: Uncle is BLACK (or NIL) - Rotations
    // Determine the type of rotation needed (LL, LR, RL, RR)
    // Note: These conditions are usually written as (x is LEFT child of parent AND parent is LEFT child of grandparent) etc.
    LL = (parent === grandparent.left && x === parent.left);
    LR = (parent === grandparent.left && x === parent.right);
    RL = (parent === grandparent.right && x === parent.left);
    RR = (parent === grandparent.right && x === parent.right);

    rootSubtree = null; // This variable will hold the new root of the rotated subtree.

    if (LL) { // Left-Left case (straight line)
        rootSubtree = rotateRight(tree, grandparent);
        rootSubtree.colour = false;       // new root of subtree (old parent) becomes BLACK
        grandparent.colour = true; // old root of subtree (grandparent) becomes RED
    } else if (RR) { // Right-Right case (straight line)
        rootSubtree = rotateLeft(tree, grandparent);
        rootSubtree.colour = false;       // new root of subtree (old parent) becomes BLACK
        grandparent.colour = true; // old root of subtree (grandparent) becomes RED
    } else if (LR) { // Left-Right case (zig-zag)
        // First rotateLeft around parent (x's parent)
        rotateLeft(tree, parent); // This modifies the subtree. parent is now x's left child.
        // Now, the structure is effectively a LL case, so perform rotateRight around grandparent.
        rootSubtree = rotateRight(tree, grandparent);
        rootSubtree.colour = false;       // The pivot node (which is 'x' now) becomes BLACK
        rootSubtree.left.colour = true;   // The old parent (now rootSubtree.left) becomes RED
        rootSubtree.right.colour = true;  // The old grandparent (now rootSubtree.right) becomes RED // <--- ADDED
    } else if (RL) { // Right-Left case (zig-zag)
        // First rotateRight around parent (x's parent)
        rotateRight(tree, parent); // This modifies the subtree. parent is now x's right child.
        // Now, the structure is effectively an RR case, so perform rotateLeft around grandparent.
        rootSubtree = rotateLeft(tree, grandparent);
        rootSubtree.colour = false;       // The pivot node (which is 'x' now) becomes BLACK
        rootSubtree.left.colour = true;   // The old grandparent (now rootSubtree.left) becomes RED // <--- ADDED
        rootSubtree.right.colour = true;  // The old parent (now rootSubtree.right) becomes RED // <--- ADDED
    } else {
        console.log('Unclassified rotation case.');
        return;
    }

    // After any rotation, the overall tree root might have changed.
    // The `rootSubtree` node is the new root of the (sub)tree that was just balanced.
    // If its parent is NIL, then it becomes the new overall root.
    if (rootSubtree.parent === tree.nullNode) { // This is more robust than checking grandparent === tree.root
        tree.root = rootSubtree;
    }
    // No need for 'if (grandparent === tree.root)' because rotate functions handle parent updates.
}
function getSibling(node) {
    var parent;
    parent = node.parent;
    return node === parent.left ? parent.right : parent.left;
}
function getUncle(tree, x) {
    var grandparent, parent;
    parent = x.parent;
    if (parent) {
        grandparent = parent.parent;
    } else {
        grandparent = null;
    }
    if (!grandparent) {
        return tree.nullNode;
    }
    if (parent === grandparent.left) {
        return grandparent.right;
    } else {
        return grandparent.left;
    }
}

function deleteNodeAI(tree, node, key) {
    var foundNode, node, nullNode, x, y, yColour, z;
    nullNode = tree.nullNode;
    z = nullNode;
    foundNode = false;
    while (true) {
        if (node !== nullNode && !foundNode) {
            if (node.data === key) {
                z = node;
                foundNode = true;
            } else {
                if (key < node.data) {
                    node = node.left;
                } else {
                    node = node.right;
                }
            }
        } else {
            break;
        }
    }
    if (z === nullNode) {
        console.log('Couldn\'t find node with key:', key);
        return;
    }
    y = z;
    yColour = y.colour;
    if (z.left === nullNode) {
        x = z.right;
        joinParentChild(tree, z, z.right);
    } else {
        if (z.right === nullNode) {
            x = z.left;
            joinParentChild(tree, z, z.left);
        } else {
            y = minimum(tree, z.right);
            yColour = y.colour;
            x = y.right;
            if (y.parent !== z) {
                joinParentChild(tree, y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            joinParentChild(tree, z, y);
            y.left = z.left;
            y.left.parent = y;
            y.colour = z.colour;
        }
    }
    if (yColour === false) {
        if (x.colour === true) {
            x.colour = false;
        } else {
            fixDoubleBlack(tree, x);
        }
    }
}

function joinParentChild(tree, u, v) {
    if (u.parent === tree.nullNode) {
        tree.root = v;
    } else {
        if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
    }
    v.parent = u.parent;
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
    }
    console.log("Is tree.root nullNode?", tree.root === tree.nullNode);
if (tree.root !== tree.nullNode) {
    console.log("Root value:", tree.root.data, "Root color:", tree.root.colour);
}
    console.log('Red-Black Tree:');
    printTreeNode(tree, tree.root, '', false);
    deleteNodeAI(tree, tree.root, 17);
    console.log('After deleting ');
    printTreeNode(tree, tree.root, '', false);
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
function printTreeNode(tree, node, indent = "", isLeft = true) {
    var color, label, newIndent;
    if (node === tree.nullNode) {
        return;
    }
    label = isLeft ? 'L:' : 'R:';
    color = node.colour ? 'red' : 'black';
    console.log(indent + label + node.data + ' (' + color + ')');
    newIndent = isLeft ? indent + '|  ' : indent + '   ';
    printTreeNode(tree, node.left, newIndent, true);
    printTreeNode(tree, node.right, newIndent, false);
}
function rotateLeft(tree, x) {
    var t, y;
    y = x.right;
    t = y.left;
    y.parent = x.parent;
    y.left = x;
    x.parent = y;
    x.right = t;
    if (t !== tree.nullNode) {
        t.parent = x;
    }
    if (x === tree.root) {
        tree.root = y;
    } else {
        if (y.parent.left === x) {
            y.parent.left = y;
        } else {
            y.parent.right = y;
        }
    }
    return y;
}
function rotateLeftRight(tree, node) {
    node.left = rotateLeft(tree, node.left);
    return rotateRight(tree, node);
}
function rotateRight(tree,x) {
    var t, y;
    y = x.left;
    t = y.right;
    y.parent = x.parent;
    y.right = x;
    x.parent = y;
    x.left = t;
    if (t !== tree.nullNode) {
        t.parent = x;
    }
    if (x === tree.root) {
        tree.root = y;
    } else {
        if (y.parent.left === x) {
            y.parent.left = y;
        } else {
            y.parent.right = y;
        }
    }
    return y;
}
function rotateRightLeft(tree, node) {
    node.right = rotateRight(tree, node.right);
    return rotateLeft(tree, node);
}
function transplant(tree, u, v) {
    if (u.parent === tree.nullNode) {
        tree.root = v;
    } else {
        if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
    }
    v.parent = u.parent;
}