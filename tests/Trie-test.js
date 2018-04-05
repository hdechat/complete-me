import { expect } from 'chai';
import Trie from '../lib/Trie.js';

describe('Trie', () => {
  let trie;

  beforeEach(() => trie = new Trie());

  it('should have a root node defaulted to null', () => {
    expect(trie.root).to.equal(null);
  });

  describe('INSERT', () => {
    it('should be able to add words as letter nodes to the Trie', () => {
      trie.insert('pizza');

      expect(trie.root.children.p.value).to.equal('p');
      expect(trie.root.children.p.children.i.value).to.equal('i');
      expect(trie.count).to.equal(1);
    });

    it('should be able to add two words', () => {
      trie.insert('pizza');
      trie.insert('apple');
      let keys = Object.keys(trie.root.children)

      expect(keys).to.deep.equal(['p', 'a']);
    });

    it('should be able to add words that extend beyond an already inserted word', () => {
      trie.insert('pal');
      trie.insert('pan')
      trie.insert('palomino')
      trie.insert('pram')
      let keys = Object.keys(trie.root.children.p.children.a.children)

// console.log(JSON.stringify(trie, null, 4));
      expect(keys).to.deep.equal(['l', 'n'])
      expect(trie.count).to.equal(4);
    });

    it('should not increase count if word is a duplicate', () => {
      trie.insert('apple');
      trie.insert('apple');

      expect(trie.count).to.equal(1);
      expect(trie.insert('apple')).to.equal('Duplicate word')
    });

    it('should not care about capitalization', () => {
      trie.insert('Pizza');
      trie.insert('APPLE');

      expect(trie.count).to.equal(2);
    });

  });//end describe INSERT

});
