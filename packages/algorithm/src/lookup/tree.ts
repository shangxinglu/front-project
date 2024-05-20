import { isEqual, less } from "@src/utils";

/**
 * @description 二叉查找树
 */
export class BSTree<T> {
  private queue: BSTreeNode<T>[] = [];
  public root: BSTreeNode<T> | null = null;

  private compare: SortCompare;

  constructor(compare?: SortCompare) {
    this.compare = compare || {
      less: less,
      isEqual: isEqual,
    };
  }

  // 插入
  put(key: number | string, value: T) {
    const node: BSTreeNode<T> = {
      key: key,
      value: value,
      parent: null,
      left: null,
      right: null,
      nodeSize: 0,
    };

    if (this.root === null) {
      this.root = node;
      return;
    }

    let oldNode = this.getNode(key);
    if (oldNode) {
      oldNode.value = value;
      this.updateNode(oldNode);
      return;
    }

    let current = this.root;

    while (current) {
      if (current.key === key) {
        current.value = value;
        break;
      }
      current.nodeSize++;

      if (this.compare.less(node.value, current.value)) {
        if (!current.left) {
          node.parent = current;
          current.left = node;

          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          node.parent = current;
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  // 更新节点
  updateNode(node: BSTreeNode<T>) {
    // 需要更换的节点
    let targetNode = this.getNearNode(node);
    const { key, value } = node;
    if (targetNode) {
      this.delLeafNode(targetNode);
      // 交换节点
      node.key = targetNode.key;
      node.value = targetNode.value;
    }

    // 更新父节点的nodeSize
    this.reduceParentNodeSize(node);

    this.put(key, value);
  }

  // 获取某个节点排名最接近的节点
  getNearNode(node: BSTreeNode<T>) {
    if (node.left) {
      return this.findMaxNode(node.left);
    } else if (node.right) {
      return this.findMinNode(node.right);
    }

    return null;
  }

  // 遍历父节点
  traverseParent(node: BSTreeNode<T>, fn: (node: BSTreeNode<T>) => void) {
    let current = node;
    while (current) {
      if (current.parent) {
        current = current.parent;
        fn(current);
      } else {
        break;
      }
    }
  }

  // 查找
  get(key: number | string) {
    let current = this.root;

    while (current) {
      if (current.key === key) {
        return current.value;
      } else if (this.compare.less(key, current.key)) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  getNode(key: number | string) {
    let current = this.root;

    while (current) {
      if (current.key === key) {
        return current;
      } else if (this.compare.less(key, current.key)) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  // 查找当前子树的最小节点
  findMinNode(node: BSTreeNode<T>) {
    let current = node;
    while (current.left) {
      current = current.left;
    }

    return current;
  }

  // 查找当前子树的最大节点
  findMaxNode(node: BSTreeNode<T>) {
    let current = node;
    while (current.right) {
      current = current.right;
    }

    return current;
  }

  // 将单边节点的子树连接到父节点
  connectParent(node: BSTreeNode<T>, child: BSTreeNode<T>) {
    if (node.parent) {
      if (node.parent.left === node) {
        node.parent.left = child;
      } else {
        node.parent.right = child;
      }
    } else {
      this.root = child;
    }

    if (child) {
      child.parent = node.parent;
    }
  }

  // 删除叶子节点
  delLeafNode(node: BSTreeNode<T>) {
    if (node.parent) {
      if (node.parent.left === node) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
    } else {
      this.root = null;
    }
  }

  // 判断是否是叶子节点
  isLeafNode(node: BSTreeNode<T>) {
    return !node.left && !node.right;
  }

  // 删除节点
  delNode(node: BSTreeNode<T>) {
    const nearNode = this.getNearNode(node);

    if (nearNode) {
      this.reduceParentNodeSize(nearNode);
      node.key = nearNode.key;
      node.value = nearNode.value;

      if (nearNode.left) {
        this.connectParent(nearNode, nearNode.left);
      } else if (nearNode.right) {
        this.connectParent(nearNode, nearNode.right);
      } else {
        this.delLeafNode(nearNode);
      }
    } else {
      this.reduceParentNodeSize(node);
      this.delLeafNode(node);
    }
  }

  // 删除最小节点
  delMin() {
    if (this.root) {
      let minNode = this.findMinNode(this.root);
      this.delNode(minNode);
    }
  }

  // 删除最大节点
  delMax() {
    if (this.root) {
      let maxNode = this.findMaxNode(this.root);
      this.delNode(maxNode);
    }
  }

  // 减少父节点的nodeSize
  reduceParentNodeSize(node: BSTreeNode<T>) {
    this.traverseParent(node, (node) => {
      node.nodeSize--;
    });
  }

  /**
   * @description 通过节点排名查找节点
   */
  rankNode(rank: number) {
    let current = this.root;
    if (!current) return null;
    if(rank<1 || rank>current.nodeSize+1) return null;
    let leftSize = 0;
    let rightSize = 0;
    while (current) {
        if(current.left){
            leftSize = current.left.nodeSize + 1
        } else {
            leftSize = 0
        }

        if(current.right) {
            rightSize = current.right.nodeSize + 1
        } else {
            rightSize = 0
        }
  

      if (rank < leftSize) {
        current = current.left;
        continue;
      } else if (rank === leftSize) {
        return this.findMaxNode(current.left!);
      } else if (rank === leftSize + 1) {
        return current;
      } else if (rank - leftSize - 1 === rightSize) {
        return this.findMaxNode(current.right!);
      } else if (rank - leftSize - 1 < rightSize) {
        current = current.right;
        rank = rank - leftSize - 1;
        continue;
      }
    }

    return null;
  }


}
