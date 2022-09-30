import Entity from '../entityClass.js';
import random from '../../helper/randomizer.js';

class Stick extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stick', x, y, false);
    this.gridIndexes = [spawn.addToGrid(x, y, 2)];
  }
};

export default Stick;