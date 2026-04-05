main();
function bstDelete(tree, node) {
    var mes1, mes2, message, nullNode, x, y;
    nullNode = tree.nullNode;
    console.log(`bstDelete: starting for node ${ node.key }`);
    if (!node || node === nullNode || node === undefined) {
        console.log('bstDelete: invalid node, returning nullNode');
        return nullNode;
    }
    y = node;
    mes1 = `bstDelete: node ${ node.key }`;
    mes2 = ` has left: ${ node.left.key }, right: ${ node.right.key }`;
    message = mes1 + mes2;
    console.log(message);
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
        if (x === null) {
            x = tree.nullNode;
            x.parent = y.parent;
            console.log(`bstDelete: set x.parent to ${ y.parent.key }`);
        }
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
    var fixNode, nodeToDelete, nullNode, wrapper;
    nullNode = tree.nullNode;
    nodeToDelete = findNode(tree, key);
    if (nodeToDelete === nullNode || !nodeToDelete) {
        console.log(`Node with key ${ key } not found`);
        return;
    }
    fixNode = bstDelete(tree, nodeToDelete);
    if (fixNode) {
        wrapper = describeClusterDelete(tree, fixNode);
        console.log(`Старт балансировки. Образ кластера: [${ wrapper.description }]`);
        fixDelete(tree, wrapper);
    }
    return nodeToDelete;
}
function describeClusterDelete(tree, node) {
    var P, isLeft, nodes, nullNode, parts, s, wrapper;
    if (!node) {
        console.error('Warning: undefined узла');
        return null;
    }
    nullNode = tree.nullNode;
    wrapper = {
        description: '',
        nodes: {}
    };
    nodes = {
        z: node,
        P: P
    };
    parts = [];
    console.log('Node analyze:', node ? node.key : 'UNDEFINED');
    P = node.parent;
    parts.push(`z:${ node.color }`);
    if (P !== tree.nullNode) {
        wrapper.nodes.P = P;
        isLeft = node === P.left;
        s = isLeft ? P.right : P.left;
        wrapper.nodes.s = s;
        wrapper.nodes.s_L = s.left;
        wrapper.nodes.s_R = s.right;
        parts.push(isLeft ? 'z\u2190P' : 'z\u2192P');
        parts.push(`P:${ P.color }`);
        parts.push(`s:${ s.color }, ${ isLeft ? 's\u2192P' : 's\u2190P' }`);
        parts.push(`s_L:${ wrapper.nodes.s_L.color }`);
        parts.push(`s_R:${ wrapper.nodes.s_R.color }`);
    } else {
        wrapper.description = `r:${ node.color }`;
        return wrapper;
    }
    wrapper.description = parts.join(';');
    return wrapper;
}
function describeClusterInsert(tree, node) {
    var G, P, U, nodes, nullNode, pToG, parts, x, xToP;
    nullNode = tree.nullNode;
    parts = [];
    nodes = { x: node };
    x = node;
    parts.push(`x:${ x.color }`);
    P = x.parent;
    nodes.P = P;
    if (P !== nullNode) {
        xToP = x === P.left ? 'x<P' : 'x>P';
        parts.push(`${ xToP };P:${ P.color }`);
        G = P.parent;
        nodes.G = G;
        if (G !== nullNode) {
            pToG = P === G.left ? 'P<G' : 'P>G';
            parts.push(`${ pToG };G:${ G.color }`);
            U = P === G.left ? G.right : G.left;
            nodes.U = U;
            if (U !== nullNode) {
                parts.push(`U:${U.color }`);
            } else {
                parts.push('U:null');
            }
        }
    }
    return {
        description: parts.join(';'),
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
    onsole.log(`findMin: returning ${ current.key }`);
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
function fixCase2(tree, x) {
    var grand, parent, uncle;
    parent = x.parent;
    grand = parent.parent;
    uncle = parent === grand.left ? grand.right : grand.left;
    parent.color = 'B';
    uncle.color = 'B';
    grand.color = 'R';
    return fixInsert(tree, grand);
}
function fixCase3_4(tree, x) {
    var grand, parent, x;
    parent = x.parent;
    grand = parent.parent;
    if (x === parent.right && parent === grand.left) {
        rotateLeft(tree, parent);
        x = x.left;
    } else {
        if (x === parent.left && parent === grand.right) {
            rotateRight(tree, parent);
            x = x.right;
        }
    }
    parent = x.parent;
    grand = parent.parent;
    parent.color = 'B';
    grand.color = 'R';
    if (x === parent.left && parent === grand.left) {
        rotateRight(tree, grand);
    } else {
        rotateLeft(tree, grand);
    }
    return tree;
}
function fixDelete(tree, wrapper) {
    var case1_1, case1_2, case2_1, case2_2, case2_3, case2_4, clusterMap, clusterString;
    if (wrapper == null) {
        return;
    } else {
        clusterString = wrapper.description;
    }
    clusterMap = wrapper.nodes;
    console.log(`Current cluster image 
            
            : [${ clusterString }]`);
    if ((clusterString == 'r:B' || clusterString == 'r:R' || clusterString == 'z:R') && clusterMap.z) {
        clusterMap.z.color = 'B';
        return;
    }
    case1_1 = 'z:B; z\u2190P; P:B; s:R, s\u2192P; s_L:B; s_R:B';
    case1_2 = 'z:B; z\u2192P; P:B; s:R, s\u2190P; s_L:B; s_R:B';
    if (clusterString == case1_2 || case1_2) {
        handleSibling(tree, wrapper);
    }
    case2_1 = 'z:B; z\u2190P; P:B; s:B, s\u2192P; s_L:B; s_R:B';
    case2_2 = 'z:B; z\u2192P; P:B; s:B, s\u2190P; s_L:B; s_R:B';
    case2_3 = 'z:B; z\u2190P; P:R; s:B, s\u2192P; s_L:B; s_R:B';
    case2_4 = 'z:B; z\u2192P; P:R; s:B, s\u2190P; s_L:B; s_R:B';
    if (clusterString == case2_1 || case2_2 || case2_3 || case2_4) {
        handleDebtPropagation(tree, wrapper);
    }
    if (clusterString.includes('s_L:R') || clusterString.includes('s_R:R')) {
        handleWeightRecovery(tree, wrapper);
    }
}
function fixInsert(tree, node) {
    var clusterString, wrapper;
    if (node === tree.root || node.parent.color === 'B') {
        return;
    }
    wrapper = describeClusterInsert(tree, node);
    clusterString = wrapper.description;
    console.log(`!!! Current cluster image for insert: [${ clusterString }]`);
    if (clusterString.includes('U:R')) {
        handleRecolorInsert(tree, wrapper);
    } else {
        handleRotationInsert(tree, wrapper);
    }
}
function fixInsertOld(tree, node) {
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
    return fixCase3_4(tree, node);
}
function handleDebtPropagation(tree, wrapper) {
    var clusterMap;
    clusterMap = wrapper.nodes;
    if (!clusterMap.P || !clusterMap.s) {
        return;
    }
    clusterMap.s.color = 'R';
    if (clusterMap.P.color === 'R') {
        clusterMap.P.color = 'B';
    } else {
        fixDelete(tree, describeClusterDelete(tree, clusterMap.P));
    }
}
function handleRecolorInsert(tree, wrapper) {
    var clusterMap;
    clusterMap = wrapper.nodes;
    clusterMap.P.color = 'B';
    if (clusterMap.U !== tree.nullNode) {
        clusterMap.U.color = 'B';
    }
    clusterMap.G.color = 'R';
    return fixInsert(tree, clusterMap.G);
}
function handleRotationInsert(tree, wrapper) {
    var G, P, U, clusterMap, clusterString, x;
    clusterString = wrapper.description;
    clusterMap = wrapper.nodes;
    P = wrapper.nodes.P;
    G = wrapper.nodes.G;
    U = wrapper.nodes.U;
    x = wrapper.nodes.x;
    if (clusterString.includes('x>P; P<G')) {
        rotateLeft(tree, P);
    }
    if (clusterString.includes('x<P; P>G')) {
        rotateRight(tree, P);
    }
    clusterMap.P.color = 'B';
    clusterMap.G.color = 'R';
    if (clusterString.includes('P<G')) {
        rotateRight(tree, G);
    }
    if (clusterString.includes('P>G')) {
        rotateLeft(tree, G);
    }
}
function handleSibling(tree, wrapper) {
    var clusterMap, clusterString, wrapperUpdate, zSaved;
    clusterMap = wrapper.nodes;
    clusterString = wrapper.description;
    if (!clusterMap.s) {
        return;
    }
    clusterMap.s.color = 'B';
    clusterMap.P.color = 'R';
    if (clusterMap && clusterMap.z) {
    }
    zSaved = clusterMap.z;
    if (clusterString.includes('z\u2190P')) {
        rotateLeft(tree, clusterMap.P);
    } else {
        rotateRight(tree, clusterMap.P);
    }
    wrapperUpdate = describeClusterDelete(tree, zSaved);
    fixDelete(tree, describeClusterDelete(tree, wrapperUpdate));
}
function handleWeightRecovery(tree, wrapper) {
    var clustaerString, clusterMap, s;
    clusterMap = wrapper.nodes;
    clustaerString = clusterrapper.description;
    s = clusterMap.s;
    if (!(clusterMap.s == null)) {
        clusterMap.s.color = 'R';
    }
    if (clusterMap.includes('z\u2190P') && clusterMap.s_R.color === 'B') {
        clusterMap.s_L.color = 'B';
        s.color = 'R';
        rotateRight(tree, s);
        s = clusterMap.P.right;
    } else {
        if (clusterString.includes('z\u2192P') && clusterMap.s_L.color === 'B') {
            clusterMap.s_R.color = 'B';
            s.color = 'R';
            rotateLeft(tree, s);
            s = clusterMap.P.left;
        }
    }
    s.color = clusterMap.P.color;
    clusterMap.P.color = 'B';
    if (clusterString.includes('z\u2190P')) {
        s.right.color = 'B';
        rotateLeft(tree, clusterrMap.P);
    } else {
        s.left.color = 'B';
        rotateRight(tree, clusterrMap.P);
    }
}
function main() {
    var count, max, min, randomVal, tree, uniqueValues, val, values;
    tree = makeRBTree();
    values = [];
    count = 10;
    min = 1;
    max = 100;
    uniqueValues = new Set();
    while (true) {
        if (uniqueValues.size < count) {
            randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
            uniqueValues.add(randomVal);
        } else {
            break;
        }
    }
    values = Array.from(uniqueValues);
    console.log('value :', values);
    for (val of values) {
        rbInsert(tree, val);
    }
    console.log('\nTree after inserts !!!:\n');
    printTree(tree, tree.root);
    deleteNode(tree, values[4]);
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
function rbInsert(tree, key) {
    var node;
    node = bstInsert(tree, key);
    fixInsert(tree, node);
    tree.root.color = 'B';
    return tree;
}
function rbInsertCaseShort(tree, node) {
    var grand, isNodeLeft, isParentLeft, parent, uncle;
    if (!node || node.key === undefined || node.key === null) {
        return 'Error: No valid node provided';
    }
    parent = node.parent;
    if (!parent || parent === tree.nullNode) {
        return 'Case 1: Node is root - x:B';
    }
    if (parent.color === 'B') {
        return 'Case 2: P:B - no fix needed';
    }
    grand = parent.parent;
    if (!grand) {
        return 'No grandparent found';
    }
    uncle = parent === grand.left ? grand.right : grand.left;
    isParentLeft = parent === grand.left;
    isNodeLeft = node === parent.left;
    if (uncle && uncle.color === 'R') {
        return 'Case 3: P:R and U:R - recolor';
    }
    if (isParentLeft && !isNodeLeft || !isParentLeft && isNodeLeft) {
        return 'Case 4: U:B, x and P in <- -> - rotate parent';
    }
    return 'Case 5: U:B, x -> -> - rotate grandparent';
    return 'Unknown insert case';
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