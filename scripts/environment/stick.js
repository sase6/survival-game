import Entity from "../entity/entity.js";
import Item from "../entity/item.js";

class Stick extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stick', x, y, false);
    this.gridIndexes = [spawn.addToGrid(x, y, 2)];
  }

  dropLoot() {
    new Item(this.x, this.y, this.spawn, 1);
  }

  onClick(playerIsClose) {
    if (!playerIsClose) return;
    this.dropLoot();
    this.kill();
  }
};

export default Stick;