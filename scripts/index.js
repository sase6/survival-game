import Spawn from './spawn.js';
const tileArea = 722;

class World {
  constructor() {
    this.perFrame = {};
    this.entityCount = 0;
    this.grid = new Array(tileArea);

    this.incrementEntity = () => {
      const postIncrement = this.entityCount;
      this.entityCount += 1;
      return postIncrement;
    }

    this.killOnFrame = (id) => delete this.perFrame[id];

    this.pushOnFrame = (id, funcs) => {
      let arrOfFuncs = Array.isArray(funcs)? funcs : [funcs];
      const existingFunctions = this.perFrame[id];
      if (existingFunctions !== undefined) this.perFrame[id] = [...existingFunctions, ...arrOfFuncs];
      else this.perFrame[id] = arrOfFuncs;
    };

    new Spawn(this);
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