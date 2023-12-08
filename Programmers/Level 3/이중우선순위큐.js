class MaxHeap {
  #heap;
  constructor() {
    this.#heap = [];
  }

  #swap(a, b) {
    [this.#heap[a], this.#heap[b]] = [this.#heap[b], this.#heap[a]];
  }

  #hasChild(childIndex) {
    return childIndex < this.#heap.length;
  }

  #findParent(index) {
    return index % 2 ? Math.floor(index / 2) : index / 2 - 1;
  }

  #getMaxChild(leftChild, rightChild) {
    return !this.#hasChild(rightChild) ||
      this.#heap[rightChild] < this.#heap[leftChild]
      ? leftChild
      : rightChild;
  }

  #maxHeapify(index) {
    const leftChild = index * 2 + 1;
    const rightChild = index * 2 + 2;

    if (!this.#hasChild(leftChild)) return;

    const maxChild = this.#getMaxChild(leftChild, rightChild);

    if (this.#heap[index] >= this.#heap[maxChild]) return;
    this.#swap(index, maxChild);
    this.#maxHeapify(maxChild);
  }

  isEmptyHeap() {
    return this.#heap.length === 0;
  }

  heapPush(value) {
    this.#heap.push(value);

    let i = this.#heap.length - 1;
    let parent = this.#findParent(i);

    while (parent >= 0 && this.#heap[i] > this.#heap[parent]) {
      this.#swap(i, parent);
      i = parent;
      parent = this.#findParent(i);
    }
  }

  heapPop() {
    this.#swap(0, this.#heap.length - 1);
    const maxValue = this.#heap.pop();
    this.#maxHeapify(0);

    return maxValue;
  }

  pop() {
    this.#heap.pop();
  }
}

class MinHeap {
  #heap;
  constructor() {
    this.#heap = [];
  }

  #swap(a, b) {
    [this.#heap[a], this.#heap[b]] = [this.#heap[b], this.#heap[a]];
  }

  #hasChild(childIndex) {
    return childIndex < this.#heap.length;
  }

  #findParent(index) {
    return index % 2 ? Math.floor(index / 2) : index / 2 - 1;
  }

  #getMinChild(leftChild, rightChild) {
    return !this.#hasChild(rightChild) ||
      this.#heap[rightChild] > this.#heap[leftChild]
      ? leftChild
      : rightChild;
  }

  #minHeapify(index) {
    const leftChild = index * 2 + 1;
    const rightChild = index * 2 + 2;

    if (!this.#hasChild(leftChild)) return;

    const minChild = this.#getMinChild(leftChild, rightChild);

    if (this.#heap[index] <= this.#heap[minChild]) return;
    this.#swap(index, minChild);
    this.#minHeapify(minChild);
  }

  isEmptyHeap() {
    return this.#heap.length === 0;
  }

  heapPush(value) {
    this.#heap.push(value);

    let i = this.#heap.length - 1;
    let parent = this.#findParent(i);

    while (parent >= 0 && this.#heap[i] < this.#heap[parent]) {
      this.#swap(i, parent);
      i = parent;
      parent = this.#findParent(i);
    }
  }

  heapPop() {
    this.#swap(0, this.#heap.length - 1);
    const minValue = this.#heap.pop();
    this.#minHeapify(0);

    return minValue;
  }

  pop() {
    this.#heap.pop();
  }
}

const CMD_INSERT = "I";
const DEL_MIN_HEAP = "-1";
const DEL_MAX_HEAP = "1";

function solution(operations) {
  const minHeap = new MinHeap();
  const maxHeap = new MaxHeap();

  operations.forEach((op) => {
    const [cmdType, number] = op.split(" ");

    if (cmdType === CMD_INSERT) {
      maxHeap.heapPush(Number(number));
      minHeap.heapPush(Number(number));
      return;
    }

    if (number === DEL_MAX_HEAP && !maxHeap.isEmptyHeap()) {
      maxHeap.heapPop();
      minHeap.pop();
    } else if (number === DEL_MIN_HEAP && !minHeap.isEmptyHeap()) {
      minHeap.heapPop();
      maxHeap.pop();
    }
  });

  return maxHeap.isEmptyHeap()
    ? [0, 0]
    : [maxHeap.heapPop(), minHeap.heapPop()];
}

console.log(
  solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"])
);
[0, 0];

console.log(
  solution([
    "I -45",
    "I 653",
    "D 1",
    "I -642",
    "I 45",
    "I 97",
    "D 1",
    "D -1",
    "I 333",
  ])
);
[333, -45];

console.log(
  solution([
    "I 4",
    "I 3",
    "I 2",
    "I 1",
    "D 1",
    "D 1",
    "D -1",
    "D -1",
    "I 5",
    "I 6",
  ])
);
[6, 5];
