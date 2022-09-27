import Player from "./entities/player.js";
import Tree from './entities/tree/treeClass.js';

class World {
  constructor() {
    this.perFrame = [];
    this.pushOnFrame = (func) => this.perFrame.push(func);
    this.player = new Player(0, 0, 100, this.pushOnFrame);

    new Tree(100, 150, this.pushOnFrame, this.player);
    this.loop();
  }

  loop() {
    for (let i = 0; i < this.perFrame.length; i++) {
      const func = this.perFrame[i];
      func();
    }

    window.requestAnimationFrame(() => this.loop());
  }
};

new World();