import Node from './Node.js'

export default class Trie {
  constructor() {
    this.root = new Node('.')
    this.count = 0;
  }

  insert(data) {
    let currNode = this.root;

    for(let i = 0; i < data.length; i++) {

      if(!currNode.left) {
        currNode.left = new Node(data[i]);
        currNode = currNode.left;
      } else if(!currNode.right){
        currNode.right = new Node(data[i]);
        currNode = currNode.right;
      }
  
    }
    currNode.completeWord = true;
    this.count++;
  }

  suggest() {

  }

  populate() {

  }
}