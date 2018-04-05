export default class Node {
  constructor(value = null) {
    this.value = value;
    this.children = {};
    this.endWord = false;
  }
}