import data from './data';
import Table from './Table';

// eslint-disable-next-line no-unused-vars
const table = new Table('container', data);

function* generateSortedSequence() {
  const types = ['id', 'title', 'year', 'imdb'];
  let typeIter = 0;

  while (true) {
    yield table.sort(types[typeIter], 'down');
    yield table.sort(types[typeIter], 'up');
    typeIter += 1;
    if (typeIter >= types.length) {
      typeIter = 0;
    }
  }
}

const generatorSorting = generateSortedSequence();

setInterval(() => {
  generatorSorting.next();
}, 2000);
