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
/*function insert(tree, key) {
    const node = bstInsert(tree, key);
    fixInsert(tree, node);
    // ensure root is black
    tree.root.color = 'B';
    return tree;
}
*/
function insert(tree, key) {
    const { nullNode } = tree;
    
    // Вставка в двоичное дерево поиска
    const newNode = bstInsert(tree, key);
    newNode.color = "R"; // Новый узел всегда красный
    
    // Создаем образ кластера после вставки
    const clusterInfo = describeCluster(tree, newNode);
    console.log(`Cluster after input: newNode = ${newNode.key}   ${clusterInfo.description}`);
    
    // Определяем случай для корректировки, используя узлы из clusterInfo
    const caseInfo = determineInsertCaseFromNodes(clusterInfo.nodes, tree);
    console.log(`Fix required: ${caseInfo}`);
    
    // Балансировка
    fixInsert(tree, newNode);
    
    return newNode;
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
    //console.log("search 55 ->", search(tree, 55).key);

    return tree;
}

// Run when executed by node
if (typeof require !== "undefined" && require.main === module) {
    main();
}

// Cluster
function describeCluster(tree, node) {
    const { nullNode } = tree;
    const parts = [];
    const nodes = { x: node };
    
    // x - новый узел
    const x = node;
    parts.push(`x:${x.color}`);
    
    // P - родитель
    const P = x.parent;
    nodes.P = P;
    if (P !== nullNode) {
        // Определяем направление связи x-P
        const xToP = (x === P.left) ? 'x<-P' : 'x->P';
        parts.push(`${xToP}; P:${P.color}`);
        
        // G - дед
        const G = P.parent;
        nodes.G = G;
        if (G !== nullNode) {
            // Определяем направление связи P-G
            const pToG = (P === G.left) ? 'P<-G' : 'P->G';
            parts.push(`${pToG}; G:${G.color}`);
            
            // U - дядя
            const U = (P === G.left) ? G.right : G.left;
            nodes.U = U;
            if (U !== nullNode) {
                parts.push(`U:${U.color}`);
            } else {
                parts.push('U:null');
            }
            
            // Добавляем информацию о детях если они не nullNode
            if (x.left !== nullNode) parts.push(`x.l:${x.left.color}`);
            if (x.right !== nullNode) parts.push(`x.r:${x.right.color}`);
            if (P.left !== nullNode && P.left !== x) parts.push(`P.l:${P.left.color}`);
            if (P.right !== nullNode && P.right !== x) parts.push(`P.r:${P.right.color}`);
        }
    }
    
    return {
        description: parts.join(', '),
        nodes: nodes
    };
}

// Determine

function determineInsertCaseFromNodes(nodes, tree) {
    const { nullNode } = tree;
    const { x, P, G, U } = nodes;

    // Case 0: x - корень дерева
    if (P === nullNode) {
        return "Case 0: x is root - simply recolor to black";
    }

    // Case 1: родитель черный - нарушений нет
    if (P.color === "B") {
        return "Case 1: Parent is black - no violation";
    }

    // Если деда нет, то P - корень, что невозможно т.к. корень черный
    if (G === nullNode) {
        return "Case 1: Grandparent is null - no violation";
    }

    // Case 2: родитель и дядя красные
    if (U && U.color === "R") {
        return "Case 2: Parent and Uncle are red - recolor parent, uncle and grandparent";
    }

    // Case 3 и 4: дядя черный
    const isPLeftChild = (P === G.left);
    const isXLeftChild = (x === P.left);

    if (isPLeftChild) {
        if (!isXLeftChild) {
            return "Case 3: Parent is left child, x is right child - left rotation on parent";
        } else {
            return "Case 4: Parent is left child, x is left child - right rotation on grandparent + recolor";
        }
    } else {
        if (isXLeftChild) {
            return "Case 3: Parent is right child, x is left child - right rotation on parent";
        } else {
            return "Case 4: Parent is right child, x is right child - left rotation on grandparent + recolor";
        }
    }
}