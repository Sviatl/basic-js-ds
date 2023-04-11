const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    } else {
      let current = this.rootNode;
      while (true) {
        if (data === current.data) return;
        if (data < current.data) {
          if (current.left === null) {
            current.left = newNode;
            return;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = newNode;
            return;
          }
          current = current.right;
        }
      }
    }
  }

  has(data) {
    let current = this.rootNode;
    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }


  find(data) {
    if (this.rootNode === null) return null;
    let current = this.rootNode,
      found = false;
    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return null;
    return current;

  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }
  _removeNode(current, data) {
    if (!current) {
      return null;
    }

    if (data === current.data) {
      if (!current.left && !current.right) {
        return null;
      }

      if (!current.left) {
        return current.right;
      }

      if (!current.right) {
        return current.left;
      }

      let tempNode = current.right;
      while (tempNode.left) {
        tempNode = tempNode.left;
      }

      current.data = tempNode.data;
      current.right = this._removeNode(current.right, tempNode.data);
      return current;
    }

    if (data < current.data) {
      current.left = this._removeNode(current.left, data);
      return current;
    }

    current.right = this._removeNode(current.right, data);
    return current;
  }
  min() {
    if (!this.rootNode) {
      return null;
    }

    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }

    return current.data;
  }


  max() {
    if (!this.rootNode) {
      return null;
    }

    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};