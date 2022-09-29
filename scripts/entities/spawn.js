import Player from './player/player.js';
import Tree from './tree/treeClass.js';
import Grass from './environment/grassClass.js';
import Deer from './animals/deer.js';
import WaterBody from './environment/waterBodyClass.js';
import Stone from './environment/stoneClass.js';
import Mushroom from './environment/mushroom.js';
import random from '../helper/randomizer.js';

class Spawn {
  constructor(pushOnFrame, killOnFrame, incrementEntity, grid) {
    this.pushOnFrame = pushOnFrame;
    this.killOnFrame = killOnFrame;
    this.incrementEntity = incrementEntity;
    this.grid = grid;

    // Spawns
    this.spawnPlayer();
    this.spawnWaterBodies();
    this.spawnStone();
    this.spawnGrass();
    this.spawnTrees(35, 20);
    this.spawnDeers();
  }

  getGridIndex(x, y) {
    const snappedX = Math.floor(x / 32);                                                                                                                                                                                
    const snappedY = Math.floor(y / 32); 
    const rowMultiplier = snappedY * 38;
    return rowMultiplier + snappedX;
  }

  addToGrid(x, y, storage) {
    const gridIndex = this.getGridIndex(x, y);
    this.grid[gridIndex] = storage;
    return gridIndex;
  }

  checkGrid(x, y) {
    return this.grid[this.getGridIndex(x, y)];
  }

  spawnPlayer(x=0, y=0, hp=100) {
    this.player = new Player(x, y, this);
  }

  spawnWaterBodies(minBodiesOfWater=1, maxBodiesOfWater=3, xMax=700, yMax=500) {
    for (let i = 0; i < random.number(maxBodiesOfWater, minBodiesOfWater); i++) {
      const x = random.snappedValue(xMax, 50);
      const y = random.snappedValue(yMax, 50);
      new WaterBody(x, y, this);
    }
  }

  spawnStone(xMax=1184, yMax=772) {
    for (let x = 1; x < xMax; x += 32) {
      for (let y = 1; y < yMax; y += 32) {
        if (this.grid[this.getGridIndex(x, y)] !== undefined || random.percent(97)) continue;
        new Stone(x, y, this);
      }
    }
  }

  spawnGrass(xMax=1184, yMax=772) {
    for (let x = 1; x < xMax; x += 32) {
      for (let y = 1; y < yMax; y += 32) {
        if (this.grid[this.getGridIndex(x, y)] !== undefined) continue;
        if (random.percent(80)) continue;

        if (random.percent(15)) new Grass(x, (y - 32), this, 'tall-grass');
        else if (random.percent(5)) {
          new Mushroom(x, y, this);
          new Grass(x, y, this);
        }
        else new Grass(x, y, this);
      }
    }
  }

  spawnTrees(max, min) {
    let maxTrees = parseInt(random.number(max, min));

    for (let i = 0; i < maxTrees; i++) {
      let x = random.snappedValue(1072, 32);
      let y = random.snappedValue(472, 32);

      if (this.grid[this.getGridIndex(x, (y + 96))] !== undefined) continue;
      new Tree(x, y, this); // this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player);
    }
  }

  spawnDeers(chance=30, xMax=1216, yMax=608, squareSize=128) {
    for (let x = 0; x < xMax; x += squareSize) {
      for (let y = 0; y < yMax; y += squareSize) {
        if (random.percent(chance) && this.grid[this.getGridIndex(x, y + 96)]) {
          new Deer(x, (y + 64), this);
        }
      }
    }
  }
};

export default Spawn;

// Grid Codes
// 1. Unspawnable
// 2. Unspawnable/ Unable to walk on