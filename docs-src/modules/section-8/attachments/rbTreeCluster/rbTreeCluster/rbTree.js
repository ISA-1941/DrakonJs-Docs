main();
function Insert(tree, data) {
    var NIL, direction, insertionInfo, newNode, parent;
    NIL = tree.nullNode;
    if (tree.root === NIL) {
        tree.root = createNode(data, false, NIL, NIL, NIL);
        return;
    }
    insertionInfo = findInsertionPoint(tree, tree.root, data, NIL);
    if (insertionInfo.duplicate) {
        console.log('Duplicate value: ' + data);
        return;
    }
    parent = insertionInfo.parent;
    direction = insertionInfo.direction;
    newNode = createNode(data, true, parent, NIL, NIL);
    if (direction === 'left') {
        parent.left = newNode;
    } else {
        parent.right = newNode;
    }
    fixRedRed(tree, newNode);
    tree.root.colour = false;
}
function InsertNew(tree, value) {
    var new_inserted_node;
    new_inserted_node = insertNode(tree, tree.root, value);
    if (tree.root === null) {
        tree.root = new_inserted_node;
        tree.root.colour = false;
        return;
    }
    if (new_inserted_node !== tree.root && new_inserted_node.parent && new_inserted_node.parent.colour === true) {
        fixInsert(tree, new_inserted_node);
    }
    tree.root.colour = false;
}
function createNode(data, colour, parent, left, right) {
    return {
        data: data,
        colour: colour,
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
function findInsertionPoint(tree, node, data, parent) {
    if (node === tree.nullNode) {
        return {
            parent: parent,
            direction: data < parent.data ? 'left' : 'right'
        };
    }
    if (data < node.data) {
        return findInsertionPoint(tree, node.left, data, node);
    } else {
        if (data > node.data) {
            return findInsertionPoint(tree, node.right, data, node);
        } else {
            return {
                node: node,
                duplicate: true
            };
        }
    }
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
function fixInsert(tree, x_param) {
    var G, P, U, currentNodeImage, current_x, is_fix_complete, next_x_node, result;
    current_x = x_param;
    while (true) {
        if (true) {
            if (current_x === tree.root) {
                current_x.colour = false;
                return;
            }
            P = current_x.parent;
            if (P === null || P.colour === false) {
                return;
            }
            G = P.parent;
            if (G === null) {
                P.colour = false;
                return;
            }
            U = getUncle(tree, current_x);
            currentNodeImage = generateNodeImage(tree, current_x);
            if (currentNodeImage === 'CASE_A') {
                result = handleBlackUncle(tree, current_x, P, G, U, currentNodeImage);
            } else {
                result = handleRedUncle(tree, current_x, P, G, U);
            }
            next_x_node = result.next_x_node;
            is_fix_complete = result.is_fix_complete;
            if (is_fix_complete) {
                return;
            } else {
                current_x = next_x_node;
            }
        } else {
            break;
        }
    }
}
function fixRedRed(tree,x) {
    var LL, LR, RL, RR, grandparent, parent, rootSubtree, uncle;
    if (x === tree.root) {
        x.colour = false;
        return;
    }
    parent = x.parent;
    if (parent.colour === false) {
        return;
    }
    grandparent = parent.parent;
    if (grandparent === tree.nullNode) {
        parent.colour = false;
        return;
    }
    uncle = getUncle(tree, x);
    if (uncle.colour === true) {
        parent.colour = false;
        uncle.colour = false;
        grandparent.colour = true;
        fixRedRed(tree, grandparent);
        return;
    }
    LL = parent === grandparent.left && x === parent.left;
    LR = parent === grandparent.left && x === parent.right;
    RL = parent === grandparent.right && x === parent.left;
    RR = parent === grandparent.right && x === parent.right;
    rootSubtree = null;
    if (LL) {
        rootSubtree = rotateRight(tree, grandparent);
        rootSubtree.colour = false;
        grandparent.colour = true;
    } else {
        if (RR) {
            rootSubtree = rotateLeft(tree, grandparent);
            rootSubtree.colour = false;
            grandparent.colour = true;
        } else {
            if (LR) {
                rotateLeft(tree, parent);
                rootSubtree = rotateRight(tree, grandparent);
                rootSubtree.colour = false;
                rootSubtree.left.colour = true;
                rootSubtree.right.colour = true;
            } else {
                if (RL) {
                    rotateRight(tree, parent);
                    rootSubtree = rotateLeft(tree, grandparent);
                    rootSubtree.colour = false;
                    rootSubtree.left.colour = true;
                    rootSubtree.right.colour = true;
                } else {
                    console.log('Unclassified rotation case.');
                    return;
                }
            }
        }
    }
    if (rootSubtree.parent === tree.nullNode) {
        tree.root = rootSubtree;
    }
}
function generateNodeImage(tree, x) {
    var G, P, U, imageParts, isUncleRed, p_segment, x_segment;
    P = x.parent;
    G = P ? P.parent : null;
    U = getUncle(tree, x);
    if (!P || !G) {
        return '';
    }
    isUncleRed = U !== tree.nullNode && U.colour === true;
    if (isUncleRed) {
        return 'CASE_A';
    } else {
        p_segment = 'P:R';
        p_segment += P === G.left ? ',P<-G' : ',P->G';
        imageParts = [];
        imageParts.push(p_segment);
        imageParts.push('U:B');
        x_segment = 'x:R';
        x_segment += x === P.left ? ',x<-P' : ',x->P';
        imageParts.push(x_segment);
        return imageParts.join('; ');
    }
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
function handleBlackUncle(tree,x, P, G, U, nodeImage) {
    var newRootOfSubtree;
    if (nodeImage === 'X:R,X->P; P:R,P<-G; G:B; U:B') {
        newRootOfSubtree = rotateLeftRight(tree, G);
    } else {
        if (nodeImage === 'X:R,X<-P; P:R,P->G; G:B; U:B') {
            newRootOfSubtree = rotateRightLeft(tree, G);
        } else {
            if (nodeImage === 'X:R,X<-P; P:R,P<-G; G:B; U:B') {
                newRootOfSubtree = rotateRight(tree, G);
            } else {
                if (nodeImage === 'X:R,X->P; P:R,P->G; G:B; U:B') {
                    newRootOfSubtree = rotateLeft(tree, G);
                } else {
                    if (console.error('handleBlackUncle')) {
                        newRootOfSubtree = tree.root;
                    }
                }
            }
        }
    }
    newRootOfSubtree.colour = false;
    G.colour = true;
    return {
        next_x_node: newRootOfSubtree,
        is_fix_complete: true
    };
}
function handleRedUncle(tree, x, P, G, U) {
    P.colour = false;
    U.colour = false;
    G.colour = true;
    return {
        next_x_node: G,
        is_fix_complete: false
    };
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
    console.log('Red-Black Tree:');
    printTreeNode(tree, tree.root, '', false);
    deleteNodeAI(tree, tree.root, 9);
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