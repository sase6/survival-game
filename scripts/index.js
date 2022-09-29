import Player from "./entities/player/player.js";
import spawn from './entities/spawn.js';

class World {
  constructor() {
    this.perFrame = {};
    this.entityCount = 0;

    // Functions
    this.incrementEntity = () => this.entityCount++;
    this.pushOnFrame = (id, arrOfFuncs) => {
      let arrOfFuncs = Array.isArray(arrOfFuncs)? arrOfFuncs : [arrOfFuncs];
      if (this.perFrame[id] !== undefined) this.perFrame[i] === [...this.perFrame[id], ...arrOfFuncs];
      else this.perFrame[i] = arrOfFuncs;
    };

    // Global Entities
    this.player = new Player(0, 0, 100, this.pushOnFrame);

    // Spawn Entities
    // spawn.waterBodies(this.pushOnFrame, this.player);
    // spawn.stones(1, this.pushOnFrame, this.player);
    // spawn.grasses(15, this.pushOnFrame, this.player);
    // spawn.deers(12.5, this.pushOnFrame, this.player);
    // spawn.trees(40, 20, this.pushOnFrame, this.player);

    this.loop();
  }

  loop() {
    for (let entityId in this.perFrame) {
      const funcArr = this.perFrame[entityId];
      for (let i = 0; i < funcArr.length; i++) {
        const func = funcArr[i];
        func();
      }
    }

    window.requestAnimationFrame(() => this.loop());
  }
};

new World();