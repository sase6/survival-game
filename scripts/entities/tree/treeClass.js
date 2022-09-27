import Entity from '../entityClass.js';

class Tree extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 300, 'default-tree', pushOnFrame, false);
    this.player = player;
  }
}

export default Tree;