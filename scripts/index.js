import Player from "./entities/player/player.js";
import Spawn from './entities/spawn.js';

class World {
  constructor() {
    // Global Variables
    this.perFrame = {};
    this.entityCount = 0;
    this.grid = new Array((19 * 38)); //Pixel Area of Game /32

    // Functions
    this.incrementEntity = () => {
      this.entityCount++;
      return this.entityCount - 1;
    }

    this.killOnFrame = (id) => delete this.perFrame[id];

    this.pushOnFrame = (id, funcs) => {
      let arrOfFuncs = Array.isArray(funcs)? funcs : [funcs];
      if (this.perFrame[id] !== undefined) this.perFrame[id] = [...this.perFrame[id], ...arrOfFuncs];
      else this.perFrame[id] = arrOfFuncs;
    };

    // Start
    new Spawn(this.pushOnFrame, this.killOnFrame, this.incrementEntity, this.grid);
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