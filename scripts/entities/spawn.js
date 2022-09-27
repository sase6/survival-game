import Tree from './tree/treeClass.js';
import Grass from './environment/grassClass.js';
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
      if (random.percent(chance)) new Grass(x, y, pushOnFrame, player);
    }
  }
};

export default {
  trees, grasses
};