import Node from './Node.js'

export default class Trie {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  insert(word) {
    word = word.toLowerCase();
    if(!this.root) {
      this.root = new Node();
    }

    let currNode = this.root.children;
    let index = 0;

    while(currNode[word[index]]) {
      currNode = currNode[word[index]].children;
      index++;
    }

    if(index === word.length) {
      return 'Duplicate word';
    }

    for(let i = index; i < word.length; i++) {
      currNode[word[i]] = new Node(word[i]);
      if(i === word.length - 1) {
        currNode[word[i]].endWord = true;
      }
      currNode = currNode[word[i]].children
    }
    this.count++;
  }

  suggest(word) {
   //for length of word, iterate thru matching nodes.
   //for the last node, get keys of children object.
   //build array of keys of children until endWord is true.
   //concat word with joined array and push to return array.
   word = word.toLowerCase;
   let currNode = this.root.children;
   let index = 0;
   while(currNode[word[index]]) {
    currNode = currNode[word[index]].children;
    index++
   }
    //   recursive function   //
   //at this point index is the literal length of the word
   //currNode is at last letter's children object node.
   // let keys = Object.keys(currNode);
   //for each key letter, push into array, then repeat: 
   //let currNode = currNode.Key.children
   //let keys = Object.keys(currNode) ...
   //basecase is when currNode.endWord === true;
   //suggestArray.push(word + [...arrayOfKeys])
    let suggestions = [];
    let keys = Object.keys(currNode)

    return [`${word}suggestions.join('')]


  }

  populate() {

  }
}