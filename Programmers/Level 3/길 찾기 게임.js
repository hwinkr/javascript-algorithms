class BinaryTree {
  constructor(pos_x, number) {
    this.pos_x = pos_x;
    this.number = number;
    this.left = null;
    this.right = null;
  }

  #insertLeft(pos_x, number) {
    this.left
      ? this.left.insert(pos_x, number)
      : (this.left = new BinaryTree(pos_x, number));
  }

  #insertRight(pos_x, number) {
    this.right
      ? this.right.insert(pos_x, number)
      : (this.right = new BinaryTree(pos_x, number));
  }

  insert(pos_x, number) {
    this.pos_x > pos_x
      ? this.#insertLeft(pos_x, number)
      : this.#insertRight(pos_x, number);
  }
}

const preOrder = (node, arr) => {
  if (node !== null) {
    arr.push(node.number);
    preOrder(node.left, arr);
    preOrder(node.right, arr);
  }
};

const postOrder = (node, arr) => {
  if (node !== null) {
    postOrder(node.left, arr);
    postOrder(node.right, arr);
    arr.push(node.number);
  }
};

function solution(nodeinfo) {
  const nodeArray = nodeinfo
    .map((info, index) => [...info, index + 1])
    .sort((a, b) => b[1] - a[1])
    .map((info) => [info[0], info[2]]);

  const [rootX, rootNumber] = nodeArray[0];
  const tree = new BinaryTree(rootX, rootNumber);

  for (let i = 1; i < nodeArray.length; i += 1) {
    const [x, number] = nodeArray[i];
    tree.insert(x, number);
  }

  const preOrderArray = [];
  const postOrderArray = [];

  preOrder(tree, preOrderArray);
  postOrder(tree, postOrderArray);

  return [preOrderArray, postOrderArray];
}

// console.log(
//   solution([
//     [5, 3],
//     [11, 5],
//     [13, 3],
//     [3, 5],
//     [6, 1],
//     [1, 3],
//     [8, 6],
//     [7, 2],
//     [2, 2],
//   ])
// ); [[7,4,6,9,1,8,5,2,3],[9,6,5,8,1,4,3,2,7]]
