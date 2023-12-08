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

  getHeap() {
    return this.#heap;
  }
}

const maxHeap = new MaxHeap();

maxHeap.heapPush(5);
maxHeap.heapPush(9);
maxHeap.heapPush(11);
maxHeap.heapPush(3);

console.log(maxHeap.getHeap()); // [11, 5, 9 3];
