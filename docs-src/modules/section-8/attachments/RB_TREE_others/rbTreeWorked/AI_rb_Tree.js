Old 25.05.25
function fixDoubleBlack(tree,x) {
    var parent, sibling, x;
    while (true) {
        if (x !== tree.root && x.colour === false) {
            parent = x.parent;
            sibling = getSibling(x);
            x = parent;
        } else {
            break;
        }
    }
    if (sibling.colour === true) {
        parent.colour = true;
        sibling.colour = false;
        if (x === parent.left) {
            rotateLeft(tree, parent);
        } else {
            rotateRight(tree, parent);
        }
    } else {
        if (sibling.left.colour === false && sibling.right.colour === false) {
            sibling.colour = true;
            x = parent;
        } else {
            if (x === parent.left && sibling.right.colour === false) {
                sibling.left.colour = false;
                sibling.colour = true;
                rotateRight(tree, sibling);
                sibling = parent.right;
            } else {
                if (x === parent.right && sibling.left.colour === false) {
                    sibling.right.colour = false;
                    sibling.colour = true;
                    rotateLeft(tree, sibling);
                    sibling = parent.left;
                }
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
    x = tree.root;
}

function joinParentChild(tree, u, v) {
    if (u.parent === tree.nullNode) {
        tree.root = v;
    } else if (u === u.parent.left) {
        u.parent.left = v;
    } else {
        u.parent.right = v;
    }
    v.parent = u.parent;
}

function minimum(tree, node) {
    while (node.left !== tree.nullNode) {
        node = node.left;
    }
    return node;
}



// Иван Иванович

function deleteNodeAI(tree, node, key) {
    let nullNode = tree.nullNode;
    let z = nullNode;
    let x, y;

    // Step 1: Find the node with this value    // Step 1: Find the node with this value

    while (node !== nullNode) {
        if (node.data === key) {
            z = node;
            break;
        }
        if (key < node.data) {
            node = node.left;
        } else {
            node = node.right;
        }
    }

    if (z === nullNode) {
        console.log("Couldn't find node with key:", key);
        return;
    }

    // Step 2: Preparation for removal    
    y = z;
    let yColour = y.colour;

    if (z.left === nullNode) {
        x = z.right;
        joinParentChild(tree, z, z.right);
    } else if (z.right === nullNode) {
        x = z.left;
        joinParentChild(tree, z, z.left);
    } else {
        y = minimum(tree, z.right);
        yColour = y.colour;
        z.data = y.data;
        joinParentChild(tree, y, y.right);
        x = y.right;
    }

    // Step 3: Балансировка
    if (yColour === false) {
        if (x.colour === true) {
            x.colour = false;
        } else {
            fixDoubleBlack(tree, x);
        }
    }
}

// Deep Seek

function fixDoubleBlackDS(tree, x) {
    // Until x is not the root and remains double black
    while (x !== tree.root && x.colour === BLACK) {
        const parent = x.parent;
        const sibling = getSibling(x);

        // Case 1: Brother red
        if (sibling.colour === RED) {
            parent.colour = RED;
            sibling.colour = BLACK;
            
            if (x === parent.left) {
                rotateLeft(tree, parent);
            } else {
                rotateRight(tree, parent);
            }
        }
        // Case 2: A black brother with two black children
        else if (
            sibling.left.colour === BLACK &&
            sibling.right.colour === BLACK
        ) {
            sibling.colour = RED;
            x = parent; // Move the double black up
        } 
        else {
            // Case 3: Brother black with red child "inside
            if (
                x === parent.left &&
                sibling.right.colour === BLACK
            ) {
                sibling.left.colour = BLACK;
                sibling.colour = RED;
                rotateRight(tree, sibling);
                sibling = parent.right;
            } 
            else if (
                x === parent.right &&
                sibling.left.colour === BLACK
            ) {
                sibling.right.colour = BLACK;
                sibling.colour = RED;
                rotateLeft(tree, sibling);
                sibling = parent.left;
            }

            // Case 4: A black brother with a red child "outside"
            sibling.colour = parent.colour;
            parent.colour = BLACK;
            
            if (x === parent.left) {
                sibling.right.colour = BLACK;
                rotateLeft(tree, parent);
            } else {
                sibling.left.colour = BLACK;
                rotateRight(tree, parent);
            }
            x = tree.root; // Complete balancing

        }
    }

    x.colour = BLACK; // Фиксируем корень или красный узел
}

function getSiblingDS(node) {
    const parent = node.parent;
    return node === parent.left ? parent.right : parent.left;
}

// Auxiliary function for obtaining a brother
function getSibling(node) {
    const parent = node.parent;
    return node === parent.left ? parent.right : parent.left;
}

// Примеры поворотов (должны быть реализованы)
function rotateLeft(tree, node) {
    const rightChild = node.right;
    node.right = rightChild.left;
    
    if (rightChild.left !== tree.nullNode) {
        rightChild.left.parent = node;
    }
    
    rightChild.parent = node.parent;
    
    if (node.parent === tree.nullNode) {
        tree.root = rightChild;
    } else if (node === node.parent.left) {
        node.parent.left = rightChild;
    } else {
        node.parent.right = rightChild;
    }
    
    rightChild.left = node;
    node.parent = rightChild;
}

function rotateRight(tree, node) {
    // Аналогично rotateLeft, но в зеркальном отражении
}



// -----------------------------------
function fixRedRed(tree,x) {   // checked Correct
    var LL, LR, RL, RR, grandparent, mid, parent, uncle;
    console.log('fixRedRed   x = ', x);
    if (x === tree.root) {
        x.colour = false;
        return;
    }
   // if (!x || !x.parent || !x.parent.parent || x.parent === tree.nullNode || x.parent.parent === tree.nullNode) {
   //     return;
   // }
    parent = x.parent;
    grandparent = parent.parent;
    uncle = getUncle(tree, x);
    if (parent.colour === false) {
        return;
    }
    if (uncle !== tree.nullNode && uncle.colour === true) {
        parent.colour = false;
        uncle.colour = false;
        grandparent.colour = true;
        fixRedRed(tree, grandparent);
        return true;
    }
    LL = parent === grandparent.left && x === parent.left;
    LR = parent === grandparent.left && x === parent.right;
    RL = parent === grandparent.right && x === parent.left;
    RR = parent === grandparent.right && x === parent.right;
    mid = null;
    if (LL) {
        mid = rotateRight(tree, grandparent);
    } else {
        if (LR) {
            mid = rotateLeftRight(tree, grandparent);
        } else {
            if (RL) {
                mid = rotateRightLeft(tree, grandparent);
            } else {
                if (RR) {
                    mid = rotateLeft(tree, grandparent);
                } else {
                    console.log('Unclassified rotation case.');
                    return;
                }
            }
        }
    }
}



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
        colour: false, // black
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

function insert(tree, data) {
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

const x = findNode(tree.root, 15);
if (x) {
    console.log("Node found:", x.value);
    fixRedRed(x);  // запуск восстановления свойств
}


function fixRedRed(tree, x) {
    if (x === tree.root) {
        x.colour = false;
        return;
    }

    if (!x.parent || !x.parent.parent) {
        return;
    }

    const parent = x.parent;
    const grandparent = parent.parent;
    const uncle = getUncle(tree, x);

    if (!parent.colour) {
        return; // Родитель чёрный — нарушений нет
    }

    if (uncle !== tree.nullNode && uncle.colour === true) {
        parent.colour = false;
        uncle.colour = false;
        grandparent.colour = true;
        fixRedRed(tree, grandparent);
        return;
    }

    // Определяем случай поворота
    const isLeftLeft = parent === grandparent.left && x === parent.left;
    const isLeftRight = parent === grandparent.left && x === parent.right;
    const isRightLeft = parent === grandparent.right && x === parent.left;
    const isRightRight = parent === grandparent.right && x === parent.right;

    let mid = null;

    if (isLeftLeft) {
        mid = rotateRight(tree, grandparent);
    } else if (isLeftRight) {
        mid = rotateLeftRight(tree, grandparent);
    } else if (isRightLeft) {
        mid = rotateRightLeft(tree, grandparent);
    } else if (isRightRight) {
        mid = rotateLeft(tree, grandparent);
    } else {
        console.log("Unclassified rotation case.");
        return;
    }

    mid.colour = false;
    if (mid.left) mid.left.colour = true;
    if (mid.right) mid.right.colour = true;
}

function getUncle(tree, x) {
    const parent = x.parent;
    const grandparent = parent ? parent.parent : null;
    if (!grandparent) return tree.nullNode;
    return (parent === grandparent.left)
        ? grandparent.right
        : grandparent.left;
}

function rotateLeft(tree, x) {
    const y = x.right;
    const T = y.left;

    y.parent = x.parent;
    y.left = x;
    x.parent = y;
    x.right = T;

    if (T !== tree.nullNode) {
        T.parent = x;
    }

    if (x === tree.root) {
        tree.root = y;
    } else if (y.parent.left === x) {
        y.parent.left = y;
    } else {
        y.parent.right = y;
    }

    return y;
}

function rotateRight(tree, x) {
    const y = x.left;
    const T = y.right;

    y.parent = x.parent;
    y.right = x;
    x.parent = y;
    x.left = T;

    if (T !== tree.nullNode) {
        T.parent = x;
    }

    if (x === tree.root) {
        tree.root = y;
    } else if (y.parent.left === x) {
        y.parent.left = y;
    } else {
        y.parent.right = y;
    }

    return y;
}

function rotateLeftRight(tree, node) {
    node.left = rotateLeft(tree, node.left);
    return rotateRight(tree, node);
}

function rotateRightLeft(tree, node) {
    node.right = rotateRight(tree, node.right);
    return rotateLeft(tree, node);
}


function findNode(tree, value) {
    let curr = tree.root;
    const nullNode = tree.nullNode;

    while (curr !== nullNode) {
        if (curr.value === value) {
            return curr;
        } else if (value < curr.value) {
            curr = curr.left;
        } else if (value > curr.value) {
            curr = curr.right;
        } else {
            throw new Error("Unexpected condition in findNode");
        }
    }

    return null;
}

function insert(tree, value) {
    tree.root = insertNode(tree, tree.root, value);
    const x = findNode(tree, value);
    fixRedRed(tree, x);
}


function main() {
    const tree = createRBTree();
    const values = [21, 17, 15, 11, 9, 7, 5, 3];

    for (const val of values) {
        insert(tree, val);
    }

    console.log("Red-Black Tree:");
    printTreeNode(tree, tree.root, "", false);
}
function printTreeNode(tree, node, indent = "", isLeft = true) {
    if (node === tree.nullNode) return;

    const label = isLeft ? "L:" : "R:";
    const color = node.colour ? "red" : "black";

    console.log(indent + label + node.value + " (" + color + ")");

    const newIndent = isLeft ? indent + "|  " : indent + "   ";
    printTreeNode(tree, node.left, newIndent, true);
    printTreeNode(tree, node.right, newIndent, false);
}
