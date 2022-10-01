import random from "./helper/randomizer.js"; 
import Player from "./player/player.js";
import WaterBody from "./environment/waterBody.js";
import Grass from "./environment/grass.js";
import Tree from "./environment/tree.js";
import Stone from './environment/stone.js';
import Stick from "./environment/stick.js";
import Deer from "./animals/deer.js";

class Spawn {
  constructor(world) {
    this.pushOnFrame = world.pushOnFrame;
    this.killOnFrame = world.killOnFrame;
    this.incrementEntity = world.incrementEntity;
    this.grid = world.grid;
    this.player = new Player(0, 0, this);

    // Water Body
    this.spawnByCount(100, 3, WaterBody, 0, 0, 1);
    
    // Grasses
    this.spawnByArea(15, Grass);

    // Trees
    this.spawnByRandom(30, 20, Tree);

    // Stones
    this.spawnByArea(3, Stone);

    // Sticks 
    this.spawnByArea(1, Stick);

    // Deers
    this.spawnByArea(10, Deer, 128, 0, 96);
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

  spawnByArea(chance=50, entity, areaSize=32, xGridModifier=0, yGridModifier=0, xMax=1184, yMax=568) {
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

  spawnByRandom(max=25, min=1, entity, xMax=1072, yMax=472, xGridModifier=0, yGridModifier=96) {
    const maximumEntities = random.number(max, min);

    for (let i = 0; i < maximumEntities; i++) {
      const x = random.snappedValue(xMax);
      const y = random.snappedValue(yMax);
      if (this.checkGrid(x + xGridModifier, y + yGridModifier) !== undefined) continue;
      new entity(x, y, this);
    }
  }
};

export default Spawn;

// Grid Codes 
// 1. Unspawnable
// 2. Unspawnable && Unwalkable