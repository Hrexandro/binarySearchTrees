//Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.

function Node (data, right, left){
  return {
    data,
    right,
    left
  };
}

//Build a Tree class / factory which accepts an array when initialized.
//The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

function Tree (arr){
  return {
    root: function (arr){
      buildTree(arr)
    }
  };
}


//Write a buildTree function which takes an array of data
//(e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
//and turns it into a balanced binary tree full of Node objects appropriately placed
//(don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
function buildTree (arr){

}