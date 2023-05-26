const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.

function Node(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

//Build a Tree class / factory which accepts an array when initialized.
//The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

function Tree(arr) {
  return {
    root: buildTree(arr),
    find: function (value, currentNode = this.root) {
      if (currentNode === null) {
        return null;
      } else if (currentNode.data === value) {
        return currentNode;
      } else if (currentNode.left || currentNode.right) {
        let result = this.find(value, currentNode.left);
        if (result === null) {
          result = this.find(value, currentNode.right);
        }
        return result;
      }
      return null;
    },
    add: function (value, currentNode = this.root) {
      if (this.root === null) {
        this.root = Node(value);
        return;
      } else if (currentNode.data === value) {
        return;
      } else if (currentNode.data > value) {
        if (currentNode.left === null) {
          currentNode.left = Node(value);
        } else {
          this.add(value, currentNode.left);
        }
      } else if (currentNode.data < value) {
        if (currentNode.right === null) {
          currentNode.right = Node(value);
        } else {
          this.add(value, currentNode.right);
        }
      }
    },
    delete: function (value, currentNode = this.root) {
      function findLeftmostChild(value, currentNode) {
        if (currentNode.left === null) {
          return currentNode;
        } else {
          return findLeftmostChild(value, currentNode.left);
        }
      }

      this.root = deleteRecursively(value, this.root);

      function deleteRecursively(value, currentNode) {
        if (currentNode === null) {
          return currentNode;
        }

        if (currentNode.data > value) {
          currentNode.left = deleteRecursively(value, currentNode.left);
        } else if (currentNode.data < value) {
          currentNode.right = deleteRecursively(value, currentNode.right);
        } else if (currentNode.data === value) {
          if (currentNode.right === null) {
            return currentNode.left;
          } else if (currentNode.left === null) {
            return currentNode.right;
          } else {
            let substituteValue = findLeftmostChild(
              value,
              currentNode.right
            ).data;
            currentNode.right = deleteRecursively(
              substituteValue,
              currentNode.right
            );
            currentNode.data = substituteValue;
            return currentNode;
          }
        }
        return currentNode;
      }
    },
    levelOrder: function (appliedFunction, queue = [this.root]) {
      if (queue.length < 1) {
        return;
      }
      if (queue[0].left) {
        queue.push(queue[0].left);
      }
      if (queue[0].right) {
        queue.push(queue[0].right);
      }
      appliedFunction(queue[0].data);
      queue.shift();
      this.levelOrder(appliedFunction, queue);
    },
    inorder: function (appliedFunction) {
      let result = [];
      let startingNode = this.root;
      function traverseInOrder(currentNode = startingNode) {
        if (currentNode === null) {
          return;
        } else {
          traverseInOrder(currentNode.left);
          result.push(currentNode.data);
          traverseInOrder(currentNode.right);
        }
      }
      traverseInOrder();
      if (appliedFunction) {
        result.forEach((e) => {
          appliedFunction(e);
        });
      } else {
        return result;
      }
    },
    preorder: function (appliedFunction) {
      let result = [];
      let startingNode = this.root;
      function traverseInOrder(currentNode = startingNode) {
        if (currentNode === null) {
          return;
        } else {
          result.push(currentNode.data);
          traverseInOrder(currentNode.left);
          traverseInOrder(currentNode.right);
        }
      }
      traverseInOrder();
      if (appliedFunction) {
        result.forEach((e) => {
          appliedFunction(e);
        });
      } else {
        return result;
      }
    },
    postorder: function (appliedFunction) {
      let result = [];
      let startingNode = this.root;
      function traverseInOrder(currentNode = startingNode) {
        if (currentNode === null) {
          return;
        } else {
          traverseInOrder(currentNode.left);
          traverseInOrder(currentNode.right);
          result.push(currentNode.data);
        }
      }
      traverseInOrder();
      if (appliedFunction) {
        result.forEach((e) => {
          appliedFunction(e);
        });
      } else {
        return result;
      }
    },
    height: function (node = this.root) {
      if (node === null) {
        return -1;
      }
      return 1 + Math.max(this.height(node.right), this.height(node.left));
    },
    depth: function (node, currentNode = this.root) {
      if (currentNode === null || node === null) {
        return;
      }
      if (node === currentNode) {
        return 0;
      } else if (node.data < currentNode.data) {
        return 1 + this.depth(node, currentNode.left);
      } else {
        return 1 + this.depth(node, currentNode.right);
      }
    },
    isBalanced: function (node = this.root) {
      function minHeight(currentNode = node) {
        if (currentNode === null) {
          return -1;
        }
        return (1 + Math.min(minHeight(currentNode.right), minHeight(currentNode.left)));
      }
      return (this.height() - minHeight()) <= 1 ? true : false
    },
    //Write a rebalance function which rebalances an unbalanced tree.
    //Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
    rebalance: function (){
      let result = []
      this.inorder((e)=>{result.push(e)})
      this.root = buildTree(result)
      return this
      //level order traversal so is sorted
    }
  };
}

function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }

  let sortedArrWithoutDuplicates = [...new Set(arr)].sort((a, b) => {
    return a - b;
  });

  let midPoint = parseInt((sortedArrWithoutDuplicates.length - 1) / 2);
  let rootData = sortedArrWithoutDuplicates[midPoint];
  let left = buildTree(sortedArrWithoutDuplicates.slice(0, midPoint));
  let right = buildTree(sortedArrWithoutDuplicates.slice(midPoint + 1));
  let root = Node(rootData, left, right);

  return root;
}

let exampleArray = [10, 14, 803, 1409, 937, 10743, 2, 702, 103, 81, 36, 7];
//let exampleArray = [1, 2,3,4];
//let exampleArray = []
let exampleTree = Tree(exampleArray);
prettyPrint(exampleTree.root);
// prettyPrint(exampleTree.root)
// exampleTree.delete(3)
// prettyPrint(exampleTree.root);
// exampleTree.delete(4)
// prettyPrint(exampleTree.root);
// exampleTree.delete(12)
// prettyPrint(exampleTree.root);
// exampleTree.delete(2323)
console.log(exampleTree.isBalanced());
console.log(exampleTree.rebalance())
exampleTree.add(3);
exampleTree.add(4);
exampleTree.add(5);
exampleTree.delete(803);
exampleTree.delete(103);
exampleTree.delete(937);
exampleTree.delete(702);
exampleTree.delete(1409);
exampleTree.delete(10743);
prettyPrint(exampleTree.root);
console.log(exampleTree.height());
console.log(exampleTree.isBalanced());
console.log(exampleTree.rebalance())
prettyPrint(exampleTree.root);
//console.log(exampleTree.depth(exampleTree.find(833431)))
//exampleTree.levelOrder(console.log)
