function createNode(val) {
  return {
    val,
    left: null,
    right: null
  };
}

function insertNode(node, value) {
    // Empty space - create new node

    if (node === null) {
        return createNode(value);
    }

    // Duplicate found - can return null or throw error
    if (node.value === value) {
        throw new Error("Duplicated node: " + value);
    }

    // Insert in right subtree
    if (value > node.value) {
        node.right = insertNode(node.right, value);
    }

    // Insert in left sub

    if (value < node.value) {
        node.left = insertNode(node.left, value);
    }

    // Post Insert Balance

    return rotateInsert(node);
}

function rotateInsert(node, value) {
    updateHeight(node);
    const balance = getBalance(node);

    // Left Left case (LL)
    if (balance > 1 && value < node.left.value) {
        return rotateRight(node);
    }

    // Right Right case (RR)
    if (balance < -1 && value > node.right.value) {
        return rotateLeft(node);
    }

    // Left Right case (LR)
    if (balance > 1 && value > node.left.value) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }

    // Right Left case (RL)
    if (balance < -1 && value < node.right.value) {
        node.right = rotateRight(node.right);
        return rotateLeft(node);
    }

    return node;  Balancing not required

}

function height(node) {
    return node ? node.height : 0;
}

function updateHeight(node) {
    node.height = 1 + Math.max(height(node.left), height(node.right));
}

function getBalance(node) {
    return height(node.left) - height(node.right);
}

function rotateLeft(z) {
    const y = z.right;
    const T2 = y.left;

    // Perform rotation
    y.left = z;
    z.right = T2;

    // Update heights
    updateHeight(z);
    updateHeight(y);

    // Return new root
    return y;
}

function rotateRight(z) {
    const y = z.left;
    const T3 = y.right;

    // Perform rotation
    y.right = z;
    z.left = T3;

    // Update heights
    updateHeight(z);
    updateHeight(y);

    // Return new root
    return y;
}
