import { expect } from 'chai';

import Trie from '../lib/Trie.js';

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should have a root node defaulted to a period', () => {
    expect(trie.root.data).to.equal('.');
  });

  describe('insert', () => {
    it('should be able to add words as letter nodes to the Trie', () => {
      trie.insert('pizza');

      expect(trie.root.left.data).to.equal('p');
      expect(trie.root.left.left.data).to.equal('i');
    });

    it('should keep count of words in the Trie', () => {
      trie.insert('pizza');

      expect(trie.count).to.equal(1);
    });

    it('should flag the node at the end of a complete word', () => {
      trie.insert('pizza');
      expect(trie.root.left.left.completeWord).to.equal(false);
      expect(trie.root.left.left.left.completeWord).to.equal(false);
      expect(trie.root.left.left.left.left.left.completeWord).to.equal(true);
    });

    it('should be able to add other words as letter nodes to the Trie', () => {
      trie.insert('pizza');
      trie.insert('apple');

      expect(trie.count).to.equal(2);
    });

    it.skip('should be able to add on to an existing word to make a longer word', () => {
      trie.insert('pizza');
      trie.insert('apple');
      trie.insert('pizzeria')
// console.log(JSON.stringify(trie, null, 4))

      expect(trie.count).to.equal(3);
      expect(trie.root.left.left.left.left.right.data).to.equal('e');
    }); 
  });
});
