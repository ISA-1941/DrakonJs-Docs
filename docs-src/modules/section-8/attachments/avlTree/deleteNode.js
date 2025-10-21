function deleteNode(node, value) {
    if (node === null) return null;

    if (value < node.value) {
        node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
        node.right = deleteNode(node.right, value);
    } else {
        // Node found - 3 cases:

        // 1. Sheet
        if (node.left === null && node.right === null) {
            return null;
        }

        // 2. One descendant
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        // 3. Two descendants - replace with minNode value on the right

        const minNode = findMin(node.right);
        node.value = minNode.value;
        node.right = deleteNode(node.right, minNode.value);
    }

    // Balancing and return
    node.height = 1 + Math.max(height(node.left), height(node.right));
    return rebalance(node);
}
function rebalance(node) {
    if (node === null) return null;
    node.height = 1 + Math.max(height(node.left), height(node.right));
    var balance = getBalance(node);

    if (balance > 1 && getBalance(node.left) >= 0) {
        return rotateRight(node);
    }
    if (balance > 1 && getBalance(node.left) < 0) {
        node.left = rotateLeft(node.left);
        return rotateRight(node);
    }
    if (balance < -1 && getBalance(node.right) <= 0) {
        return rotateLeft(node);
    }
    if (balance < -1 && getBalance(node.right) > 0) {
        node.right = rotateRight(node.right); // ← исправлено имя
        return rotateLeft(node);
    }

    return node;
}
