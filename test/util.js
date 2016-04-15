import { findNeighbors } from '../src/util';

describe('findNeighborIndexes()', () => {
  it('3x3 grid', () => {
    const testArray = [0, 1, 2,
                       3, 4, 5,
                       6, 7, 8];

    findNeighbors(0, 3, testArray)
      .should.eql([1, 3, 4]);

    findNeighbors(1, 3, testArray)
      .should.eql([0, 2, 3, 4, 5]);

    findNeighbors(2, 3, testArray)
      .should.eql([1, 4, 5]);

    findNeighbors(3, 3, testArray)
      .should.eql([0, 1, 4, 6, 7]);

    findNeighbors(4, 3, testArray)
      .should.eql([0, 1, 2, 3, 5, 6, 7, 8]);

    findNeighbors(5, 3, testArray)
      .should.eql([1, 2, 4, 7, 8]);

    findNeighbors(6, 3, testArray)
      .should.eql([3, 4, 7]);

    findNeighbors(7, 3, testArray)
      .should.eql([3, 4, 5, 6, 8]);

    findNeighbors(8, 3, testArray)
      .should.eql([4, 5, 7]);
  });
});
