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
    rebalance: function (){
      let result = []
      this.inorder((e)=>{result.push(e)})
      this.root = buildTree(result)
      return this
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

function createArrayOfRandomNumbers(number = Math.floor(Math.random() * 20) + 1){
  let result = []
  for (let i = 0; i < number; i++){
    result.push(Math.floor(Math.random() * 100) + 1)
  }
  return result
}

let exampleTree = Tree(createArrayOfRandomNumbers())
prettyPrint(exampleTree.root)
console.log(exampleTree.isBalanced());
console.log("Level order printout: ")
exampleTree.levelOrder((e)=>{console.log(e)})
console.log("Preorder printout: ")
exampleTree.preorder((e)=>{console.log(e)})
console.log("Postorder printout: ")
exampleTree.postorder((e)=>{console.log(e)})
console.log("Inorder printout: ")
exampleTree.inorder((e)=>{console.log(e)})
exampleTree.add((Math.floor(Math.random() * 100) + 100))
exampleTree.add((Math.floor(Math.random() * 100) + 100))
exampleTree.add((Math.floor(Math.random() * 100) + 100))
exampleTree.add((Math.floor(Math.random() * 100) + 100))
exampleTree.add((Math.floor(Math.random() * 100) + 100))
prettyPrint(exampleTree.root)
console.log(exampleTree.isBalanced());
exampleTree.rebalance()
prettyPrint(exampleTree.root)
console.log(exampleTree.isBalanced());
console.log("Level order printout: ")
exampleTree.levelOrder((e)=>{console.log(e)})
console.log("Preorder printout: ")
exampleTree.preorder((e)=>{console.log(e)})
console.log("Postorder printout: ")
exampleTree.postorder((e)=>{console.log(e)})
console.log("Inorder printout: ")
exampleTree.inorder((e)=>{console.log(e)})