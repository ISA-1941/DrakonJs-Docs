// --- Вспомогательные функции (оставлены без изменений, кроме makeNode) ---

// Node factory: key, color ('R'|'B'), left, right, parent
function makeNode(key = null, color = "B", left = null, right = null, parent = null) {
    return { key, color, left, right, parent };
}

// Tree factory with sentinel nullNode
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

// Rotations - логика корректна
function rotateLeft(tree, x) {
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

// --- Исправленные функции ---

/**
 * ИСПРАВЛЕНИЕ: Заменен оператор 'if' на 'while' для корректного обхода дерева
 * и поиска места вставки.
 */
function bstInsert(tree, key) {
    var newNode, x, y;
    y = tree.nullNode;
    x = tree.root;

    // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Используем 'while' для обхода
    while (x !== tree.nullNode) {
        y = x;
        if (key < x.key) {
            x = x.left;
        } else {
            x = x.right;
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

// fix cases for insertion
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
    var grand, parent;
    
    // NOTE: Переменная 'node' в драконе была задекларирована,
    // но мы работаем с параметром 'node'.
    parent = node.parent;
    grand = parent.parent;
    
    // convert inner to outer
    if (node === parent.right && parent === grand.left) {
        rotateLeft(tree, parent);
        node = node.left; // Обновляем ссылку на текущий узел
    } else if (node === parent.left && parent === grand.right) {
        rotateRight(tree, parent);
        node = node.right; // Обновляем ссылку на текущий узел
    }
    
    // Снова получаем родителя и дедушку, так как 'node' изменился
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

/**
 * ИСПРАВЛЕНИЕ: Добавлен console.log для текущего узла ПЕРЕД рекурсивными вызовами,
 * чтобы обеспечить вывод дерева сверху вниз (Pre-order).
 */
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

    // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Печатаем текущий узел
    colorCode = node.color === 'R' ? RED : BLACK;
    console.log(indent + (isLeft ? "L── " : "R── ") + colorCode + `${node.key}(${node.color})` + RESET);
    
    indentChild = indent + (isLeft ? '\u2502   ' : '    ');
    
    // Рекурсивный вызов для потомков
    printTree(tree, node.left, indentChild, true);
    printTree(tree, node.right, indentChild, false);
}

// --- Main execution ---

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
    
    console.log('\nTree after inserts (FIXED):\n');
    printTree(tree, tree.root);
  
    deleteNode(tree, 65)
    console.log('\nTree after delete node  (FIXED):\n');
    printTree(tree, tree.root);
    
    return tree;
}

function deleteNode(tree, key) {
    const { nullNode } = tree;
    
    // Find the node to delete
    const nodeToDelete = findNode(tree, key);
    if (nodeToDelete === nullNode || !nodeToDelete) {
        console.log(`Node with key ${key} not found`);
        return;
    }
    
    // Diagnostic before deletion
    const clusterInfoBefore = describeCluster(tree, nodeToDelete);
    const caseInfoBefore = determineCase(tree, nodeToDelete, 'delete');
    console.log(`Cluster before delete: node = ${nodeToDelete.key}  ${clusterInfoBefore.description}`);
    console.log(`Delete case: ${caseInfoBefore}`);
    
    // Perform BST deletion
    const fixNode = bstDelete(tree, nodeToDelete);
    
    // Conditional fixation
    if (fixNode !== nullNode && fixNode) {
        // Diagnostic after deletion
        const clusterInfoAfter = describeCluster(tree, fixNode);
        const caseInfoAfter = determineCase(tree, fixNode, 'delete');
        console.log(`Cluster after delete: fixNode = ${fixNode.key}   ${clusterInfoAfter.description}`);
        console.log(`Fix required: ${caseInfoAfter}`);
        
        // Balance after removal
        fixDelete(tree, caseInfoAfter);
    }
    
    return nodeToDelete;
}

function findNode(tree, key) {
    const { nullNode } = tree;
    let current = tree.root;
    
    while (current !== nullNode && current !== undefined && current.key !== key) {
        if (key < current.key) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    
    return current;
}

function findMin(tree, node) {
    const { nullNode } = tree;
    
    // Добавляем больше проверок
    if (!tree || !node || node === nullNode || node === undefined) {
        console.log("findMin: Invalid input, returning nullNode");
        return nullNode;
    }
    
    console.log(`findMin: starting with node ${node.key}`);
    
    let current = node;
    while (current && current !== nullNode && current !== undefined && 
           current.left && current.left !== nullNode && current.left !== undefined) {
        console.log(`findMin: moving from ${current.key} to ${current.left.key}`);
        current = current.left;
    }
    
    console.log(`findMin: returning ${current.key}`);
    return current;
}


function bstDelete(tree, node) {
    const { nullNode } = tree;
    
    console.log(`bstDelete: starting for node ${node.key}`);
    
    // Проверка на валидность узла
    if (!node || node === nullNode || node === undefined) {
        console.log("bstDelete: invalid node, returning nullNode");
        return nullNode;
    }
    
    let y = node; // node to delete
    let x; // node that will take y's place
    
    console.log(`bstDelete: node ${node.key} has left: ${node.left.key}, right: ${node.right.key}`);
    
    // Determine the node to delete (y)
    if (node.left === nullNode || node.right === nullNode) {
        y = node;
        console.log(`bstDelete: y set to original node ${y.key}`);
    } else {
        // If both children exist, find the successor
        console.log(`bstDelete: both children exist, finding min in right subtree`);
        y = findMin(tree, node.right);
        // Добавляем проверку на валидность y
        if (!y || y === nullNode || y === undefined) {
            console.log("bstDelete: findMin returned invalid, using original node");
            y = node;
        }
        console.log(`bstDelete: y set to ${y.key}`);
    }
    
    // Determine x - y's child
    if (y.left !== nullNode) {
        x = y.left;
        console.log(`bstDelete: x set to y.left: ${x.key}`);
    } else {
        x = y.right;
        console.log(`bstDelete: x set to y.right: ${x ? x.key : 'null'}`);
    }
    
    // Добавляем проверку на существование x
    if (x) {
        x.parent = y.parent;
        console.log(`bstDelete: set x.parent to ${y.parent.key}`);
    } else {
        console.log("bstDelete: x is null, skipping parent assignment");
    }
    
    // Update parent's reference to x
    if (y.parent === nullNode) {
        tree.root = x || nullNode;
        console.log(`bstDelete: set tree.root to ${x ? x.key : 'null'}`);
    } else if (y === y.parent.left) {
        y.parent.left = x || nullNode;
        console.log(`bstDelete: set y.parent.left to ${x ? x.key : 'null'}`);
    } else {
        y.parent.right = x || nullNode;
        console.log(`bstDelete: set y.parent.right to ${x ? x.key : 'null'}`);
    }
    
    // If y is not the original node, copy data
    if (y !== node) {
        console.log(`bstDelete: copying key from ${y.key} to ${node.key}`);
        node.key = y.key;
        // If there are other data fields, copy them here
    }
    
    // Return node for fixing (if y was black, fixing is required)
    if (y.color === "B") {
        console.log(`bstDelete: y is black, returning x for fixing: ${x ? x.key : 'null'}`);
        return x || nullNode;
    }
    
    console.log("bstDelete: y is red, no fix needed, returning nullNode");
    return nullNode;
}

function findMin(tree, node) {
    const { nullNode } = tree;
    while (node.left !== nullNode) {
        node = node.left;
    }
    return node;
}

function fixDelete(tree, x) {
    const { nullNode } = tree;
    
    while (x !== tree.root && x.color === "B") {
        if (x === x.parent.left) {
            // Case when x is left child
            let sibling = x.parent.right;
            
            // Case 1: Sibling is red
            if (sibling.color === "R") {
                sibling.color = "B";
                x.parent.color = "R";
                leftRotate(tree, x.parent);
                sibling = x.parent.right;
            }
            
            // Case 2: Both sibling's children are black
            if (sibling.left.color === "B" && sibling.right.color === "B") {
                sibling.color = "R";
                x = x.parent;
            } else {
                // Case 3: Sibling's right child is black, left child is red
                if (sibling.right.color === "B") {
                    sibling.left.color = "B";
                    sibling.color = "R";
                    rightRotate(tree, sibling);
                    sibling = x.parent.right;
                }
                
                // Case 4: Sibling's right child is red
                sibling.color = x.parent.color;
                x.parent.color = "B";
                sibling.right.color = "B";
                leftRotate(tree, x.parent);
                x = tree.root;
            }
        } else {
            // Symmetric case when x is right child
            let sibling = x.parent.left;
            
            // Case 1: Sibling is red
            if (sibling.color === "R") {
                sibling.color = "B";
                x.parent.color = "R";
                rightRotate(tree, x.parent);
                sibling = x.parent.left;
            }
            
            // Case 2: Both sibling's children are black
            if (sibling.right.color === "B" && sibling.left.color === "B") {
                sibling.color = "R";
                x = x.parent;
            } else {
                // Case 3: Sibling's left child is black, right child is red
                if (sibling.left.color === "B") {
                    sibling.right.color = "B";
                    sibling.color = "R";
                    leftRotate(tree, sibling);
                    sibling = x.parent.left;
                }
                
                // Case 4: Sibling's left child is red
                sibling.color = x.parent.color;
                x.parent.color = "B";
                sibling.left.color = "B";
                rightRotate(tree, x.parent);
                x = tree.root;
            }
        }
    }
    
    x.color = "B";
}

function leftRotate(tree, x) {
    const { nullNode } = tree;
    const y = x.right;
    
    x.right = y.left;
    if (y.left !== nullNode) {
        y.left.parent = x;
    }
    
    y.parent = x.parent;
    if (x.parent === nullNode) {
        tree.root = y;
    } else if (x === x.parent.left) {
        x.parent.left = y;
    } else {
        x.parent.right = y;
    }
    
    y.left = x;
    x.parent = y;
}

function rightRotate(tree, y) {
    const { nullNode } = tree;
    const x = y.left;
    
    y.left = x.right;
    if (x.right !== nullNode) {
        x.right.parent = y;
    }
    
    x.parent = y.parent;
    if (y.parent === nullNode) {
        tree.root = x;
    } else if (y === y.parent.right) {
        y.parent.right = x;
    } else {
        y.parent.left = x;
    }
    
    x.right = y;
    y.parent = x;
}

function determineDeleteCase(tree, node) {
    const { nullNode } = tree;
    const x = node;
    
    if (x === tree.root) {
        return "Delete Case 1: x is root - done";
    }
    
    const P = x.parent;
    const isXLeftChild = (x === P.left);
    const S = isXLeftChild ? P.right : P.left;
    
    if (S.color === "R") {
        return "Delete Case 2: Sibling is red - rotate and recolor";
    }
    
    const Sl = S.left;
    const Sr = S.right;
    
    if (Sl.color === "B" && Sr.color === "B") {
        if (P.color === "B") {
            return "Delete Case 3: Sibling and its children are black, parent is black - recolor sibling";
        } else {
            return "Delete Case 4: Sibling and its children are black, parent is red - recolor sibling and parent";
        }
    }
    
    if (isXLeftChild) {
        if (Sl.color === "R" && Sr.color === "B") {
            return "Delete Case 5: Sibling's left child red, right child black - rotate and recolor";
        }
    } else {
        if (Sr.color === "R" && Sl.color === "B") {
            return "Delete Case 5: Sibling's right child red, left child black - rotate and recolor";
        }
    }
    
    if (isXLeftChild) {
        if (Sr.color === "R") {
            return "Delete Case 6: Sibling's right child is red - left rotation on parent + recolor";
        }
    } else {
        if (Sl.color === "R") {
            return "Delete Case 6: Sibling's left child is red - right rotation on parent + recolor";
        }
    }
    
    return "Unknown delete case";
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

function determineCase(tree, node, operation) {
    if (operation === 'insert') {
        return determineInsertCase(tree, node);
    } else if (operation === 'delete') {
        return determineDeleteCase(tree, node);
    }
}

main();