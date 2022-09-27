import Tree from './tree/treeClass.js';
import random from '../helper/randomizer.js';

const trees = (max, min, pushOnFrame, player) => {
  let maxTrees = random.number(max, min);
  for (let i = 0; i < maxTrees; i++) {
    let x = random.number(1072);
    let y = random.number(472);
    new Tree(x, y, pushOnFrame, player);
  }
};

export default {
  trees,
};