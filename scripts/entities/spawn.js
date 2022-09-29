import Player from './player/player.js';
import Tree from './tree/treeClass.js';
import Grass from './environment/grassClass.js';
import Deer from './animals/deer.js';
import WaterBody from './environment/waterBodyClass.js';
import Stone from './environment/stoneClass.js';
import Mushroom from './environment/mushroom.js';
import random from '../helper/randomizer.js';

// const stones = (chance, pushOnFrame, player, xMax=1200, yMax=600, size=32) => {
//   for (let x = 0; x < xMax; x += size) {
//     for (let y = 0; y < yMax; y += size) {
//       if (random.percent(chance)) new Stone(x, y, pushOnFrame, player);
//     }
//   }
// };

// const deers = (chance, pushOnFrame, player, xMax=1200, yMax=600, size=128) => {
//   for (let x = 0; x < xMax; x += size) {
//     for (let y = 0; y < yMax; y += size) {
//       if (random.percent(chance)) new Deer(x, y, pushOnFrame, player);
//     }
//   }
// };

class Spawn {
  constructor(pushOnFrame, killOnFrame, incrementEntity, grid) {
    this.pushOnFrame = pushOnFrame;
    this.killOnFrame = killOnFrame;
    this.incrementEntity = incrementEntity;
    this.grid = grid;

    // Spawns
    this.spawnPlayer();
    this.spawnWaterBodies();
    this.spawnGrass();
    this.spawnTrees(35, 20);
  }

  getGridIndex(x, y) {
    const snappedX = Math.floor(x / 32);                                                                                                                                                                                
    const snappedY = Math.floor(y / 32); 
    const rowMultiplier = snappedY * 19;
    return rowMultiplier + snappedX;
  }

  addToGrid(x, y, storage) {
    this.grid[this.getGridIndex(x, y)] = storage;
  }

  checkGrid(x, y) {
    return this.grid[this.getGridIndex(x, y)];
  }

  spawnPlayer(x=0, y=0, hp=100) {
    this.player = new Player(x, y, hp, 3.5, this.pushOnFrame, this.killOnFrame, this.incrementEntity);
  }

  spawnWaterBodies(minBodiesOfWater=1, maxBodiesOfWater=3, xMax=700, yMax=500) {
    for (let i = 0; i < random.number(maxBodiesOfWater, minBodiesOfWater); i++) {
      const x = random.snappedValue(xMax, 50);
      const y = random.snappedValue(yMax, 50);
      new WaterBody(x, y, this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player, (x,y,s) => this.addToGrid(x,y,s));
    }
  }

  spawnGrass(xMax=1184, yMax=772) {
    for (let x = 1; x < xMax; x += 32) {
      for (let y = 1; y < yMax; y += 32) {
        if (this.grid[this.getGridIndex(x, y)] !== undefined) continue;
        if (random.percent(80)) continue;

        if (random.percent(15)) new Grass(x, (y - 32), this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player, 'tall-grass');
        else if (random.percent(5)) {
          new Mushroom(x, y, this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player);
          new Grass(x, y, this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player);
        }
        else new Grass(x, y, this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player);
      }
    }
  }

  spawnTrees(max, min) {
    let maxTrees = parseInt(random.number(max, min));

    for (let i = 0; i < maxTrees; i++) {
      let x = random.snappedValue(1072, 32);
      let y = random.snappedValue(472, 32);

      if (this.grid[this.getGridIndex(x, (y + 96))] !== undefined) continue;
      new Tree(x, y, this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.player);
    }
  }
};

export default Spawn

// Grid Codes
// 1. Unspawnable
// 2. Unspawnable/ Unable to walk on