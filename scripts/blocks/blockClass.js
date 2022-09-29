import Entity from "../entities/entityClass.js";
import dropMap from "../entities/drops/dropMap.js";

class Block extends Entity {
  constructor(spawn, x, y, itemId) {
    const item = dropMap[itemId];
    super(spawn, item.block.class, x, y, false);
    this.gridIndexes = [spawn.addToGrid(x, y, item.block.gridType)];
  };
};

export default Block;