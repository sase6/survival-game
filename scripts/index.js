import Player from "./entities/player.js";
import spawn from './entities/spawn.js';

class World {
  constructor() {
    this.perFrame = [];
    this.pushOnFrame = (func) => this.perFrame.push(func);
    this.player = new Player(0, 0, 100, this.pushOnFrame);

    // Spawns
    spawn.waterBodies(this.pushOnFrame, this.player);
    spawn.grasses(15, this.pushOnFrame, this.player);
    spawn.deers(12.5, this.pushOnFrame, this.player);
    spawn.trees(25, 20, this.pushOnFrame, this.player);

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