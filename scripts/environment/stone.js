import Entity from "../entity/entity.js";
import Item from '../entity/item.js';
import random from "../helper/randomizer.js";

class Stone extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stone', x, y, false);
    this.gridIndexes = [this.spawn.addToGrid(x, y, 2)];
    
    // Meta
    this.interactRange = 48;
    this.dropPercentOnHit = 10;
  }

  dropLoot() {
    new Item(this.x, this.y, this.spawn, 2);
  }

  onClick(playerInRange, xDistance, yDistance) {
    if (this.isDead || !playerInRange || xDistance > this.interactRange || yDistance > this.interactRange) return;

    this.health -= this.player.stoneDamage;
    if (this.health <= 0) {
      this.kill();
      this.dropLoot();
      this.isDead = true;
    } else {
      if (random.percent(this.dropPercentOnHit)) this.dropLoot();
    }
  }
};

export default Stone;