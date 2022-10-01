import random from './helper/randomizer.js'; 
import Player from "./entities/player.js";

class Spawn {
  constructor(pushOnFrame, killOnFrame, incrementEntity, grid) {
    this.pushOnFrame = pushOnFrame;
    this.killOnFrame = killOnFrame;
    this.incrementEntity = incrementEntity;
    this.grid = grid;
    this.player = new Player(0, 0, this);

    // Spawner
  }

  addToGrid(x, y, gridType) {
    const gridIndex = this.getGridIndex(x, y);
    this.grid[gridIndex] = gridType;
    return gridIndex;
  }

  getGridIndex(x, y) {
    const snappedX = Math.floor(x / 32);                                                                                                                                                                                
    const snappedY = Math.floor(y / 32); 
    const rowMultiplier = snappedY * 38;
    return rowMultiplier + snappedX;
  }

  checkGrid(x, y) {
    return this.grid[this.getGridIndex(x, y)];
  }

  spawnByArea(chance=50, entity, areaSize=32, xGridModifier=0, yGridModifier=0, xMax=1216, yMax=608) {
    for (let x = 0; x < xMax; x += areaSize) {
      for (let y = 0; y < yMax; y += areaSize) {
        if (this.checkGrid(x + xGridModifier, y + yGridModifier) || random.percent(100 - chance)) continue;
        new entity(x, y, this);
      }
    }
  }

  spawnByCount(chance=100, maxAmount, entity, xGridModifier=0, yGridModifier=0, minAmount=1, xMax=700, yMax=500) {
      for (let i = 0; i < (random.number(maxAmount, minAmount)); i++) {
      const x = random.snappedValue(xMax);
      const y = random.snappedValue(yMax);
      if (random.percent(100 - chance) || this.checkGrid(x + xGridModifier, y + yGridModifier)) continue;
      new entity(x, y, this);
    }
  }
};

export default Spawn;

// Grid Codes 
// 1. Unspawnable
// 2. Unspawnable && Unwalkable