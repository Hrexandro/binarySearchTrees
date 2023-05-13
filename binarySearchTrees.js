//Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.

function Node (data, left, right){
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
    root: buildTree(arr)
  };
}


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
  let right = buildTree(sortedArrWithoutDuplicates.slice(midPoint + 1))
  let left = buildTree(sortedArrWithoutDuplicates.slice(0, midPoint))
  let root = Node(rootData, left, right)

  return root
}


function mergeSort(array){
  if (array.length < 2){
      return array
  } else {
      let midPoint = array.length/2
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
let exampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
//console.log(buildTree(exampleArray))

prettyPrint(buildTree(exampleArray))