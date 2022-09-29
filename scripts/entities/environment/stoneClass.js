import Entity from "../entityClass.js";

class Stone extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stone', x, y, false);
    this.gridIndexes = [this.spawn.addToGrid(x, y, 2)];
  }
};

export default Stone;