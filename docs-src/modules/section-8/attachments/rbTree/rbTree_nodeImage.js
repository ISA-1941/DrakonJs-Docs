main();
function Insert(tree, data) {
    var NIL, direction, insertionInfo, newNode, parent;
    NIL = tree.nullNode;
    
    if (tree.root === NIL) {
        tree.root = createNode(data, false, NIL, NIL, NIL);
        printFullTreeHistory(tree, tree.root, 'INITIAL', 'Create root');
        return;
    }
    
    insertionInfo = findInsertionPoint(tree, tree.root, data, NIL);
    
    if (insertionInfo.duplicate) {
        console.log('❌ Duplicate value: ' + data);
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
    
    // Определяем какое действие потребуется ДО балансировки
    let plannedAction = 'None';
    if (parent.colour) {
        const G = parent.parent;
        const U = G ? (parent === G.left ? G.right : G.left) : null;
        
        if (U && U.colour) {
            plannedAction = 'CASE 1: Recolor P+U->B, G->R';
        } else {
            if (parent === G.left && newNode === parent.left) {
                plannedAction = 'CASE 2: Right rotate G';
            } else if (parent === G.right && newNode === parent.right) {
                plannedAction = 'CASE 3: Left rotate G';
            } else if (parent === G.left && newNode === parent.right) {
                plannedAction = 'CASE 4: Left(P)->Right(G)';
            } else if (parent === G.right && newNode === parent.left) {
                plannedAction = 'CASE 5: Right(P)->Left(G)';
            }
        }
    }
    
    console.log(`\n🔴 INSERTING: ${data}`);
    printFullTreeHistory(tree, newNode, 'BEFORE', plannedAction);
    
    // Балансировка
    fixRedRed(tree, newNode);
    
    printFullTreeHistory(tree, newNode, 'AFTER', 'Balancing complete');
    tree.root.colour = false;
}

function printFullTreeHistory(tree, currentNode, stage, action) {
    console.log(`=== ${stage} BALANCING ===`);
    if (action) {
        console.log('Action:', action);
    }
    console.log('Node     | Parent    | Grandfather | Position  | Violation    | Action');
    console.log('-----------------------------------------------------------------------');
    
    // Запускаем обход дерева
    printPath(tree, tree.root, null, [], currentNode, stage);
    
    console.log('-----------------------------------------------------------------------\n');
}

function printPath(tree, node, parent, path, currentNode, stage) {
    if (!node || node === tree.nullNode) return;
    
    // Добавляем текущий узел в путь
    const newPath = [...path, {node: node, parent: parent}];
    
    // Если это лист или достигли целевого узла - печатаем путь
    if (node === currentNode || (node.left === tree.nullNode && node.right === tree.nullNode)) {
        for (let i = 0; i < newPath.length; i++) {
            const current = newPath[i].node;
            const parent = newPath[i].parent;
            const grandparent = i >= 2 ? newPath[i-2].node : null;
            
            const nodeStr = `${current.data}(${current.colour ? 'R' : 'B'})`.padEnd(8);
            const parentStr = parent ? `${parent.data}(${parent.colour ? 'R' : 'B'})`.padEnd(9) : 'null'.padEnd(9);
            const grandStr = grandparent ? `${grandparent.data}(${grandparent.colour ? 'R' : 'B'})`.padEnd(11) : 'null'.padEnd(11);
            
            // Определяем позицию с гарантированно работающими символами
            let position = 'root';
            if (parent) {
                const isLeftChild = current === parent.left;
                if (grandparent) {
                    const parentIsLeftChild = parent === grandparent.left;
                    position = (isLeftChild ? 'x<-' : 'x->') + 
                              (parentIsLeftChild ? 'P<-G' : 'P->G');
                } else {
                    position = (isLeftChild ? 'x<-P' : 'x->P');
                }
            }
            
            const positionStr = position.padEnd(10);
            
            // Проверяем нарушения
            let violation = 'None';
            let nodeAction = '-';
            
            if (current === currentNode) {
                const currentParent = current.parent !== tree.nullNode ? current.parent : null;
                if (currentParent && currentParent.colour && current.colour) {
                    violation = 'Red-Red';
                    if (stage === 'BEFORE') {
                        const G = currentParent.parent !== tree.nullNode ? currentParent.parent : null;
                        const U = G ? (currentParent === G.left ? G.right : G.left) : null;
                        
                        if (U && U.colour) {
                            nodeAction = 'P:B, U:B, G:R';
                        } else {
                            if (currentParent === G.left && current === currentParent.left) {
                                nodeAction = 'Right(G)';
                            } else if (currentParent === G.right && current === currentParent.right) {
                                nodeAction = 'Left(G)';
                            } else if (currentParent === G.left && current === currentParent.right) {
                                nodeAction = 'Left(P)->Right(G)';
                            } else if (currentParent === G.right && current === currentParent.left) {
                                nodeAction = 'Right(P)->Left(G)';
                            }
                        }
                    } else if (stage === 'AFTER') {
                        nodeAction = 'Fixed';
                    }
                }
            }
            
            const violationStr = violation.padEnd(13);
            const actionStr = nodeAction.padEnd(12);
            
            console.log(`${nodeStr} | ${parentStr} | ${grandStr} | ${positionStr} | ${violationStr} | ${actionStr}`);
        }
        console.log('---');
    }
    
    // Рекурсивно обходим потомков
    if (node.left !== tree.nullNode) {
        printPath(tree, node.left, node, newPath, currentNode, stage);
    }
    if (node.right !== tree.nullNode) {
        printPath(tree, node.right, node, newPath, currentNode, stage);
    }
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
    RR = parent === grandparent.right && x === parent.right;
    LR = parent === grandparent.left && x === parent.right;
    RL = parent === grandparent.right && x === parent.left;
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
       40,35,30,25,20,15,10,5,
    ];
    for (val of values) {
        Insert(tree, val);
    }
    console.log('Red-Black Tree:');
    printTreeNode(tree, tree.root, '', false);
    deleteNodeAI(tree, tree.root, 5);
    console.log('After deleting 5');
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
function rotateLeft(tree, K) {
    var L, t;
    console.log('rotateLeft');
    L = K.right;
    t = L.left;
    L.parent = K.parent;
    L.left = K;
    K.parent = L;
    K.right = t;
    if (t !== tree.nullNode) {
        t.parent = K;
    }
    if (K === tree.root) {
        tree.root = L;
    } else {
        if (L.parent.left === K) {
            L.parent.left = L;
        } else {
            L.parent.right = L;
        }
    }
    return L;
}
function rotateLeftOld(tree, K) {
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
function rotateRight(tree,K) {
    var L, t;
    console.log('rotateRight');
    L = K.left;
    t = L.right;
    L.parent = K.parent;
    L.right = K;
    K.parent = L;
    K.left = t;
    if (t !== tree.nullNode) {
        t.parent = K;
    }
    if (K === tree.root) {
        tree.root = L;
    } else {
        if (L.parent.left === K) {
            L.parent.left = L;
        } else {
            L.parent.right = L;
        }
    }
    return L;
}
function rotateRightLeft(tree, node) {
    node.right = rotateRight(tree, node.right);
    return rotateLeft(tree, node);
}
function rotateRightOld(tree,x) {
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