import Player from "./entities/player";

class World {
  constructor() {
    this.perFrame = [];
    this.player = new Player(0, 0, 100, this.pushOnFrame);

    this.loop();
  }

  pushOnFrame(func) {
    this.perFrame.push(func);
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