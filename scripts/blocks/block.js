import Entity from "../entity/entity.js";
import Item from "../entity/item.js";
import itemMap from "../data/itemMap.js";

class Block extends Entity {
  constructor(spawn, x, y, itemId) {
    const item = itemMap[itemId];
    super(spawn, item.block.class, x, y, false, itemMap[itemId].health);

    const yBottom = y + itemMap[itemId].block.height - 32;
    this.gridIndexes = [spawn.addToGrid(x, yBottom, item.block.gridType)];
    this.itemId = itemId;
  };

  drop() {
    new Item(this.x, this.y, this.spawn, this.itemId, itemMap[this.itemId].drop.dropHeight);
  }

  onClick(playerInRange) {
    if (!playerInRange || this.isDead) return;

    this.health -= this.player[itemMap[this.itemId].block.damageType];
    if (this.health <= 0) {
      this.isDead = true;
      this.kill();
      this.drop();
    }
  }
};

export default Block;