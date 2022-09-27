import Player from "./entities/player.js";

class World {
  constructor() {
    this.perFrame = [];
    this.pushOnFrame = (func) => this.perFrame.push(func);
    this.player = new Player(0, 0, 100, this.pushOnFrame);

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