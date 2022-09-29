import Player from './player/player.js';
import Tree from './tree/treeClass.js';
import Grass from './environment/grassClass.js';
import Deer from './animals/deer.js';
import WaterBody from './environment/waterBodyClass.js';
import Stone from './environment/stoneClass.js';
import Mushroom from './environment/mushroom.js';
import random from '../helper/randomizer.js';

// const trees = (max, min, pushOnFrame, player) => {
//   let maxTrees = random.number(max, min);
//   for (let i = 0; i < maxTrees; i++) {
//     let x = random.number(1072);
//     let y = random.number(472);
//     new Tree(x, y, pushOnFrame, player);
//   }
// };

// const grasses = (chance, pushOnFrame, player, xMax=1200, yMax=600, size=32) => {
//   for (let x = 0; x < xMax; x += size) {
//     for (let y = 0; y < yMax; y += size) {
//       if (random.percent(chance)) {
//         new Grass(x, y, pushOnFrame, player);
//         if (random.percent(10)) new Mushroom(x, y-1, pushOnFrame, player);
//       } else if (random.percent(5)) {
//         new Grass(x, (y - 32), pushOnFrame, player, 'tall-grass');
//       }
//     }
//   }
// };

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
  }

  addToGrid(x, y, storage) {
    const snappedX = Math.floor(x / 32);                                                                                                                                                                                
    const snappedY = Math.floor(y / 32); 
    const rowMultiplier = snappedY * 19;
    
    this.grid[rowMultiplier + snappedX] = storage;
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
};

export default Spawn

// Grid Codes
// 1. Unspawnable
// 2. Unspawnable/ Unable to walk on