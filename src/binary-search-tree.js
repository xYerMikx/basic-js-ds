const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null
}

root() {
    return this.rootNode
}

add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
        this.rootNode = newNode
        return;
    }
    let current = this.rootNode;
    while (current) {
        if (data < current.data) {
            if (!current.left) {
                current.left = newNode
                return
            }
            current = current.left
        } else {
            if (!current.right) {
                current.right = newNode
                return
            }
            current = current.right
        }
    }
}

has(data) {
    return !!this.find(data)
}

find(data) {
    let current = this.rootNode
    while (current) {
        if (data === current.data) return current
        if (data < current.data) {
            current = current.left
        } else {
            current = current.right
        }
    }
    return null
}

remove(data) {
    const removeNode = (node, data) => {
        if (!node) return null
        if (data === node.data) {
            if (!node.left && !node.right) return null
            if (!node.left) return node.right
            if (!node.right) return node.left

            let rightMin = node.right
            while (rightMin.left) rightMin = rightMin.left

            node.data = rightMin.data

            node.right = removeNode(node.right, rightMin.data)
            return node

        } else if (data < node.data) {
            node.left = removeNode(node.left, data)
            return node

        } else {
            node.right = removeNode(node.right, data)
            return node
        }
    };
    this.rootNode = removeNode(this.rootNode, data)
}

min() {
    if (!this.rootNode) return null

    let current = this.rootNode;
    while (current.left) current = current.left

    return current.data
}

max() {
    if (!this.rootNode) return null

    let current = this.rootNode
    while (current.right) current = current.right

    return current.data
}
}

module.exports = {
  BinarySearchTree
};