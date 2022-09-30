import Entity from "../entityClass.js";
import random from '../../helper/randomizer.js';
import Drop from '../drops/dropClass.js';

class Stone extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'stone', x, y, false);
    this.gridIndexes = [this.spawn.addToGrid(x, y, 2)];
    this.dropPercentOnHit = 10;
    
    // Meta
    this.takesPlayerDamage = true;
    this.playerDamageType = "stoneDamage";
  }

  dropLoot() {
    new Drop(this.x, this.y, this.spawn, 3);
  }

  onClick(damage) {
    if (this.isDead) return;

    this.health -= damage;
    if (this.health <= 0) {
      this.kill();
      this.dropLoot();
    } else {
      if (random.percent(this.dropPercentOnHit)) this.dropLoot();
    }
  }
};

export default Stone;