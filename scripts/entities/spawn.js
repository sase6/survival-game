import Tree from './tree/treeClass.js';
import Grass from './environment/grassClass.js';
import Deer from './animals/deer.js';
import WaterBody from './environment/waterBodyClass.js';
import Stone from './environment/stoneClass.js';
import Mushroom from './environment/mushroom.js';
import random from '../helper/randomizer.js';

const trees = (max, min, pushOnFrame, player) => {
  let maxTrees = random.number(max, min);
  for (let i = 0; i < maxTrees; i++) {
    let x = random.number(1072);
    let y = random.number(472);
    new Tree(x, y, pushOnFrame, player);
  }
};

const grasses = (chance, pushOnFrame, player, xMax=1200, yMax=600, size=32) => {
  for (let x = 0; x < xMax; x += size) {
    for (let y = 0; y < yMax; y += size) {
      if (random.percent(chance)) {
        new Grass(x, y, pushOnFrame, player);
        if (random.percent(10)) new Mushroom(x, y-1, pushOnFrame, player);
      }
    }
  }
};

const stones = (chance, pushOnFrame, player, xMax=1200, yMax=600, size=32) => {
  for (let x = 0; x < xMax; x += size) {
    for (let y = 0; y < yMax; y += size) {
      if (random.percent(chance)) new Stone(x, y, pushOnFrame, player);
    }
  }
};

const deers = (chance, pushOnFrame, player, xMax=1200, yMax=600, size=128) => {
  for (let x = 0; x < xMax; x += size) {
    for (let y = 0; y < yMax; y += size) {
      if (random.percent(chance)) new Deer(x, y, pushOnFrame, player);
    }
  }
};

const waterBodies = (pushOnFrame, player, minAmt=1, maxAmt=3, xMax=700, yMax=500) => {
  for (let i = 0; i < random.number(maxAmt, minAmt); i++) {
    const x = random.number(xMax, 50);
    const y = random.number(yMax, 50);
    new WaterBody(x, y, pushOnFrame, player);
  }
};

export default {
  trees, grasses, deers, waterBodies, stones
};