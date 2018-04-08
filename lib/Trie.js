import Node from './Node.js'

export default class Trie {
  constructor() {
    this.root = null;
    this.count = 0;
    this.suggestedWords = [];
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
        currNode[word[i]].word = word;
      }
      currNode = currNode[word[i]].children
    }
    this.count++;
  }

  suggest(prefix) {
    prefix = prefix.toLowerCase();
    let currNode = this.root.children;

    for(let i = 0; i < prefix.length; i++) {
      currNode = currNode[prefix[i]].children;
    }

    this.buildWords(currNode);

    return this.suggestedWords;
  }      

  buildWords(currNode) { 
    let keys = Object.keys(currNode);

    keys.forEach(key => {
      if(currNode[key].word) {
        this.suggestedWords.push(currNode[key].word);
      } 
      this.buildWords(currNode[key].children)
    });
  }

 

  populate() {

  }
}