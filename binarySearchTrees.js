function mergeSort(array){
  if (array.length < 2){
      return array
  } else {
      let midPoint = parseInt(array.length/2)
      let firstHalf = mergeSort(array.slice(0, midPoint))
      let secondHalf = mergeSort(array.slice(midPoint, array.length))
      
      let mergedArray = []

      while (mergedArray.length < array.length){

          if (firstHalf[0] < secondHalf[0]){
              mergedArray.push(firstHalf[0])
              firstHalf.shift()
          } else if (secondHalf[0] !== undefined){//comparing a number to undefined is always false
              mergedArray.push(secondHalf[0])
              secondHalf.shift()
          } else {
              mergedArray.push(firstHalf[0])
              firstHalf.shift()
          }
      }
      return mergedArray
  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

//Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.

function Node (data, left = null, right = null){
  return {
    data,
    left,
    right
  };
}

//Build a Tree class / factory which accepts an array when initialized.
//The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

function Tree (arr){
  return {
    root: buildTree(arr),
    find: function(value, currentNode = this.root){
      if (currentNode === null){
        return null
      } else if (currentNode.data === value){
        return currentNode
      } else if (currentNode.left || currentNode.right){
        let result = this.find(value, currentNode.left)
        if (result === null){
          result = this.find(value, currentNode.right)
        }
        return result
      }
      return null
    },
    add: function(value, currentNode = this.root){



      if (currentNode === null){
        console.log('should add')
        console.log(currentNode)
        currentNode = Node(value)
        console.log(currentNode)
      } else if (currentNode.data === value){
        console.log('already here')
        return
      } else if (currentNode.data > value){
        console.log(currentNode)
        this.add(value, currentNode.left)
      } else if (currentNode.data < value){
        this.add(value, currentNode.right)
      }
    }
  };
}

// 


//Write a buildTree function which takes an array of data
//(e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
//and turns it into a balanced binary tree full of Node objects appropriately placed
//(don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
function buildTree (arr){
  if (arr.length === 0){
    return null
  }
  let sortedArrWithoutDuplicates = mergeSort(arr).filter((value, index, array) => {return array.indexOf(value) === index})
  let midPoint = parseInt((sortedArrWithoutDuplicates.length - 1) / 2)
  let rootData = sortedArrWithoutDuplicates[midPoint]
  let left = buildTree(sortedArrWithoutDuplicates.slice(0, midPoint))
  let right = buildTree(sortedArrWithoutDuplicates.slice(midPoint + 1))
  let root = Node(rootData, left, right)

  return root
}




//let exampleArray = [10, 14, 803, 1409, 937, 10743, 2, 702, 103, 81, 36, 7]
let exampleArray = []
let exampleTree = Tree(exampleArray)
// prettyPrint(buildTree(exampleArray))
prettyPrint(exampleTree.root)
// // //console.log(buildTree(exampleArray))
exampleTree.add(2)
prettyPrint(exampleTree.root)
console.log(exampleTree)


