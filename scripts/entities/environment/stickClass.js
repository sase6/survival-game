import Entity from '../entityClass.js';
import Drop from '../drops/dropClass.js';

class Stick extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stick', x, y, false);
    this.gridIndexes = [spawn.addToGrid(x, y, 2)];
    this.initClickHandler();
  }

  dropLoot() {
    new Drop(this.x, this.y, this.spawn, 2);
  }

  initClickHandler() {
    this.node.addEventListener("click", () => {
      this.dropLoot(); 
      this.kill();
    });
  }
};

export default Stick;