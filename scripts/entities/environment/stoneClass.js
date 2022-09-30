import Entity from "../entityClass.js";
import random from '../../helper/randomizer.js';
import Drop from '../drops/dropClass.js';

class Stone extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stone', x, y, false);
    this.gridIndexes = [this.spawn.addToGrid(x, y, 2)];
    this.dropPercentOnHit = 10;

    this.initClick();
  }

  dropLoot() {
    new Drop(this.x, this.y, this.spawn, 3);
  }

  initClick() {
    this.node.addEventListener("click", () => {
      if (this.isDead) return;
      // lower hp...
      // if below zero -> 

      this.health -= this.spawn.player.stoneDamage;
      if (this.health <= 0) {
        this.kill();
        this.dropLoot();
      } else {
        if (random.percent(this.dropPercentOnHit)) this.dropLoot();
      }
    });
  }
};

export default Stone;