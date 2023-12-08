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

  getHeap() {
    return this.#heap;
  }
}

const minHeap = new MinHeap();

minHeap.heapPush(4);
minHeap.heapPush(2);
minHeap.heapPush(3);
minHeap.heapPush(1);

console.log(minHeap.getHeap()); // [1, 2, 3, 4];
