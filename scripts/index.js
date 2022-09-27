import Player from "./entities/player.js";
import spawn from './entities/spawn.js';

class World {
  constructor() {
    this.perFrame = [];
    this.pushOnFrame = (func) => this.perFrame.push(func);
    this.player = new Player(0, 0, 100, this.pushOnFrame);

    // Spawns
    spawn.trees(25, 13, this.pushOnFrame, this.player);

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