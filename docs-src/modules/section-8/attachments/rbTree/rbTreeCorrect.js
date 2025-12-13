main();
function bstDelete(tree, node) {
    var message, nullNode, x, y;
    nullNode = tree.nullNode;
    console.log(`bstDelete: starting for node ${ node.key }`);
    if (!node || node === nullNode || node === undefined) {
        console.log('bstDelete: invalid node, returning nullNode');
        return nullNode;
    }
    y = node;
    mes1 = `bstDelete: node ${ node.key }`;
    mes2 = ` has left: ${ node.left.key }, right: ${ node.right.key }`;
    console.log(mes1 + mes2);
    if (node.left === nullNode || node.right === nullNode) {
        y = node;
        console.log(`bstDelete: y set to original node ${ y.key }`);
    } else {
        message = `bstDelete: both children exist, finding min in right subtree`;
        console.log(message);
        y = findMin(tree, node.right);
        if (!y || y === nullNode || y === undefined) {
            console.log('bstDelete: findMin returned invalid, using original node');
            y = node;
        }
        console.log(`bstDelete: y set to ${ y.key }`);
    }
    if (y.left !== nullNode) {
        x = y.left;
        console.log(`bstDelete: x set to y.left: ${ x.key }`);
    } else {
        x = y.right;
        console.log(`bstDelete: x set to y.right: ${ x ? x.key : 'null' }`);
    }
    if (x) {
        x.parent = y.parent;
        console.log(`bstDelete: set x.parent to ${ y.parent.key }`);
    } else {
        console.log('bstDelete: x is null, skipping parent assignment');
    }
    if (y.parent === nullNode) {
        tree.root = x || nullNode;
        console.log(`bstDelete: set tree.root to ${ x ? x.key : 'null' }`);
    } else {
        if (y === y.parent.left) {
            y.parent.left = x || nullNode;
            console.log(`bstDelete: set y.parent.left to ${ x ? x.key : 'null' }`);
        } else {
            y.parent.right = x || nullNode;
            console.log(`bstDelete: set y.parent.right to ${ x ? x.key : 'null' }`);
        }
    }
    if (y !== node) {
        console.log(`bstDelete: copying key from ${ y.key } to ${ node.key }`);
        node.key = y.key;
    }
    if (y.color === 'B') {
        console.log(`bstDelete: y is black, returning x for fixing: ${ x ? x.key : 'null' }`);
        return x || nullNode;
    }
    console.log('bstDelete: y is red, no fix needed, returning nullNode');
    return nullNode;
}
function bstInsert(tree, key) {
    var newNode, x, y;
    y = tree.nullNode;
    x = tree.root;
    while (true) {
        if (x !== tree.nullNode) {
            y = x;
            if (key < x.key) {
                x = x.left;
            } else {
                x = x.right;
            }
        } else {
            break;
        }
    }
    newNode = makeNode(key, 'R', tree.nullNode, tree.nullNode, y);
    if (y === tree.nullNode) {
        tree.root = newNode;
    } else {
        if (key < y.key) {
            y.left = newNode;
        } else {
            y.right = newNode;
        }
    }
    return newNode;
}
function deleteNode(tree, key) {
    var caseInfoAfter, caseInfoBefore, clusterInfoAfter, clusterInfoBefore, fixNode, message, nodeToDelete, nullNode;
    nullNode = tree.nullNode;
    nodeToDelete = findNode(tree, key);
    if (nodeToDelete === nullNode || !nodeToDelete) {
        console.log(`Node with key ${ key } not found`);
        return;
    }
    clusterInfoBefore = describeCluster(tree, nodeToDelete);
    caseInfoBefore = determineCase(tree, nodeToDelete, 'delete');
    mes1 = `Cluster before delete: node`;
    mes2 = `${nodeToDelete.key}  ${clusterInfoBefore.description}`;
    console.log(mes1 + mes2);
    //console.log(`Cluster before delete: node = ${nodeToDelete.key}  ${clusterInfoBefore.description}`);
    console.log(`Delete case: ${ caseInfoBefore }`);
    fixNode = bstDelete(tree, nodeToDelete);
    if (fixNode !== nullNode && fixNode) {
        clusterInfoAfter = describeCluster(tree, fixNode);
        caseInfoAfter = determineDeleteCase(tree, fixNode);
        fixDelete(tree, caseInfoAfter);
    }
    return nodeToDelete;
}
function determineCase(tree, node, operation) {
    if (operation === 'insert') {
        return determineInsertCase(tree, node);
    } else {
        return determineDeleteCase(tree, node);
    }
}
function determineDeleteCase(tree, node) {
    var P, S, Sl, Sr, case5_left, case5_right, isXLeftChild, nullNode, x;
    nullNode = tree.nullNode;
    x = node;
    if (x === tree.root) {
        return 'Delete Case 1: x is root - done';
    }
    P = x.parent;
    isXLeftChild = x === P.left;
    S = isXLeftChild ? P.right : P.left;
    if (S.color === 'R') {
        return 'Delete Case 2: Sibling is red - rotate and recolor';
    }
    Sl = S.left;
    Sr = S.right;
    if (Sl.color === 'B' && Sr.color === 'B') {
        if (P.color === 'B') {
            return 'Case 3';
        } else {
            return 'Case 4:';
        }
    }
    if (Sl && Sr) {
        case5_left = isXLeftChild && Sl.color === 'R' && Sr.color === 'B';
        case5_right = !isXLeftChild && Sr.color === 'R' && Sl.color === 'B';
    }
    if (case5_left || case5_right) {
        return case5_left ? 'Delete Case 5: Sibling\'s left child red' : 'Delete Case 5  Sibling\'s right child red';
    }
    if (case6_left || case6_right) {
        return case6_left ? 'Delete Case 6: Sibling\'s right child red' : 'Delete Case 5: Sibling\'s left child red';
    }
    return 'Unknown delete case';
}

function describeCluster(tree, node) {
    const { nullNode } = tree;
    const parts = [];
    const nodes = { x: node };
    
    const x = node;
    parts.push(`x:${x.color}`);
    
    const P = x.parent;
    nodes.P = P;
    if (P !== nullNode) {
        const xToP = (x === P.left) ? 'x<-P' : 'x->P';
        parts.push(`${xToP}; P:${P.color}`);
        
        const G = P.parent;
        nodes.G = G;
        if (G !== nullNode) {
            const pToG = (P === G.left) ? 'P<-G' : 'P->G';
            parts.push(`${pToG}; G:${G.color}`);
            
            const U = (P === G.left) ? G.right : G.left;
            nodes.U = U;
            if (U !== nullNode) {
                parts.push(`U:${U.color}`);
            } else {
                parts.push('U:null');
            }
        }
    }
    
    return {
        description: parts.join(', '),
        nodes: nodes
    };
}

function findMin(tree, node) {
    var node, nullNode;
    nullNode = tree.nullNode;
    while (true) {
        if (node.left !== nullNode) {
            node = node.left;
        } else {
            break;
        }
    }
    return node;
}
function findMinBest(tree, node) {
    var current;
    if (!tree || !node || node === nullNode || node === undefined) {
        console.log('findMin: Invalid input, returning nullNode');
        return nullNode;
    }
    console.log(`findMin: starting with node ${ node.key }`);
    current = node;
    while (true) {
        if (current && current !== nullNode && current !== undefined && current.left && current.left !== nullNode && current.left !== undefined) {
            console.log(`findMin: moving from ${ current.key } to ${ current.left.key }`);
            current = current.left;
        } else {
            break;
        }
    }
    console.log(`findMin: returning ${ current.key }`);
    return current;
}
function findNode(tree, key) {
    var current, nullNode;
    nullNode = tree.nullNode;
    current = tree.root;
    while (true) {
        if (current !== nullNode && current !== undefined && current.key !== key) {
            if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        } else {
            break;
        }
    }
    return current;
}
function fixCase1(tree, node) {
    return tree;
}
function fixCase2(tree, node) {
    var grand, parent, uncle;
    parent = node.parent;
    grand = parent.parent;
    uncle = parent === grand.left ? grand.right : grand.left;
    parent.color = 'B';
    uncle.color = 'B';
    grand.color = 'R';
    return fixInsert(tree, grand);
}
function fixCase3(tree, node) {
    var grand, node, parent;
    parent = node.parent;
    grand = parent.parent;
    if (node === parent.right && parent === grand.left) {
        rotateLeft(tree, parent);
        node = node.left;
    } else {
        if (node === parent.left && parent === grand.right) {
            rotateRight(tree, parent);
            node = node.right;
        }
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
function fixDelete(tree, caseInfoAfter) {
    var caseType, clusterInfo, description, nodes;
    caseType = caseInfoAfter.caseType;
    clusterInfo = caseInfoAfter.clusterInfo;
    description = caseInfoAfter.description;
    nodes = clusterInfo.nodes;
    console.log(`Executing fix for: ${ caseType }`);
    if (caseType === 'ROOT_CASE') {
        nodes.x.color = 'B';
    } else {
        if (caseType === 'RED_NODE') {
            nodes.x.color = 'B';
        } else {
            if (caseType === 'RED_SIBLING') {
                handleRedSiblingCase(tree, clusterInfo);
            } else {
                if (caseType === 'BLACK_SIBLING_CHILDREN') {
                    handleBlackSiblingChildrenCase(tree, clusterInfo);
                } else {
                    if (caseType === 'COMPLEX_ROTATION') {
                        handleComplexRotationCase(tree, clusterInfo);
                    } else {
                        console.log(`Unknown case: ${ caseType }`);
                    }
                }
            }
        }
    }
}
function fixInsert(tree, node) {
    var grand, parent, uncle;
    parent = node.parent;
    if (parent === tree.nullNode) {
        tree.root.color = 'B';
        return tree;
    }
    if (parent.color === 'B') {
        return fixCase1(tree, node);
    }
    grand = parent.parent;
    uncle = parent === grand.left ? grand.right : grand.left;
    if (uncle.color === 'R') {
        return fixCase2(tree, node);
    }
    return fixCase3(tree, node);
}
function insert(tree, key) {
    var node;
    node = bstInsert(tree, key);
    fixInsert(tree, node);
    tree.root.color = 'B';
    return tree;
}
function main() {
    var tree, val, values;
    tree = makeRBTree();
    values = [
        5,
        10,
        15,
        20,
        25,
        30,
        35,
        40,
        45,
        50,
        55,
        60,
        65,
        70,
        75,
        80,
        85,
        90,
        95
    ];
    for (val of values) {
        insert(tree, val);
    }
    console.log('\nTree after inserts !!!:\n');
    //console.log('tree.root = ', tree.root);
    printTree(tree, tree.root);
    deleteNode(tree, 80);
    console.log('\nTree after delete node  (FIXED):\n');
    printTree(tree, tree.root);
    setTimeout(() => {
        return tree;
    }, 0);
}
function makeNode(key, color, left, right, parent) {
    return {
        key,
        color,
        left,
        right,
        parent
    };
}
function makeRBTree() {
    var nullNode;
    nullNode = {};
    nullNode.key = null;
    nullNode.color = 'B';
    nullNode.left = nullNode;
    nullNode.right = nullNode;
    nullNode.parent = nullNode;
    return {
        root: nullNode,
        nullNode
    };
}
function printTree(tree, node = tree.root, indent = "", isLeft = true) {
    var BLACK, GRAY, RED, RESET, colorCode, indentChild;
    RED = '\x1B[31m';
    BLACK = '\x1B[37m';
    GRAY = '\x1B[90m';
    RESET = '\x1B[0m';
    if (node === tree.nullNode) {
        console.log(indent + (isLeft ? 'L\u2500\u2500 ' : 'R\u2500\u2500 ') + GRAY + 'NIL' + RESET);
        return;
    }
    colorCode = node.color === 'R' ? RED : BLACK;
    console.log(indent + (isLeft ? 'L\u2500\u2500 ' : 'R\u2500\u2500 ') + colorCode + `${ node.key }(${ node.color })` + RESET);
    indentChild = indent + (isLeft ? '\u2502   ' : '    ');
    printTree(tree, node.left, indentChild, true);
    printTree(tree, node.right, indentChild, false);
}
function processDeleteCase(tree, x) {
    if (x === x.parent.left) {
        return handleLeftCases(tree, x);
    } else {
        return handleRightCases(tree, x);
    }
}
function rotateLeft(tree,x) {
    var y;
    y = x.right;
    x.right = y.left;
    if (y.left !== tree.nullNode) {
        y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === tree.nullNode) {
        tree.root = y;
    } else {
        if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
    }
    y.left = x;
    x.parent = y;
}
function rotateRight(tree, x) {
    var y;
    y = x.left;
    x.left = y.right;
    if (y.right !== tree.nullNode) {
        y.right.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === tree.nullNode) {
        tree.root = y;
    } else {
        if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
    }
    y.right = x;
    x.parent = y;
}
function search(tree, key) {
    var node;
    node = tree.root;
    while (true) {
        if (node !== tree.nullNode) {
            if (key === node.key) {
                return node;
            }
            node = key < node.key ? node.left : node.right;
        } else {
            break;
        }
    }
    return tree.nullNode;
}