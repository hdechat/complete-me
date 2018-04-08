import { expect } from 'chai';
import Trie from '../lib/Trie.js';
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')


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
  });

    describe('SUGGEST', () => {
      it('should return a complete word beginning with the prefix', () => {
        trie.insert('apart');
        trie.insert('ape');
        trie.insert('appear');
        trie.insert('apple');
        trie.insert('apples');
        let suggestions = trie.suggest('ap');

        expect(suggestions).to.deep.equal(['apart', 'ape', 'appear', 'apple', 'apples']);
      })
    });

    describe('SELECT', () => {
      it('should increase popularity count of word', () => {
        trie.insert('dog');
        trie.select('dog');

        expect(trie.root.children.d.children.o.children.g.popularity).to.equal(1);
      });

      it('should prioritize words that have been selected', () => {
        trie.insert('apart');
        trie.insert('ape');
        trie.insert('appear');
        trie.insert('apse');

        let suggestions1 = trie.suggest('ap');
        expect(suggestions1).to.deep.equal(['apart', 'ape', 'appear', 'apse'])

        trie.select('appear');
        trie.select('appear');
        trie.select('apse');

        let suggestions2 = trie.suggest('ap');
        expect(suggestions2).to.deep.equal(['appear', 'apse', 'apart', 'ape'])
      });
    });

    describe('COUNT', () => {
      it('should return number of words in Trie', () => {
        trie.insert('apart');
        trie.insert('ape');

        let wordCount = trie.count;
        expect(wordCount).to.equal(2);

        trie.insert('appear');
        trie.insert('apse');
        wordCount = trie.count;
        expect(wordCount).to.equal(4);
      });
    });

    describe('POPULATE', () => {
      it('should populate with dictionary and not count duplicate words', () => {
        trie.populate(dictionary);

        let wordCount = trie.count;
        expect(wordCount).to.equal(234371);
      });

      it('should use dictionary data to suggest words', () => {
        trie.populate(dictionary);
        let suggestions = trie.suggest('piz');

          expect(suggestions).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
      });

      it('should not add duplicated words in the passed in array', () => {
        let data = ['A', 'a', 'egg', 'chicken', 'egg', 'rooster'];

        trie.populate(data);

        expect(trie.count).to.equal(4)
      });
    });

    describe('DELETE',() => {
      it('should delete a word from the trie', () =>{
        trie.populate(dictionary);
        let suggestions = trie.suggest('piz');
        
        expect(suggestions).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

        trie.delete('pizzle');
        let suggestions2 = trie.suggest('piz');

        trie.suggest("piz")
        expect(suggestions2).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato']);
      });
    });

});
// console.log(JSON.stringify(trie, null, 4));
