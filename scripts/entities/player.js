import Entity from './entityClass.js';

class Player extends Entity {
  constructor(x, y, hp, pushOnFrame, speed=3.5) {
    super(x, y, hp, 'player', pushOnFrame);
    this.speed = speed;
    this.prevSpeed = speed;
    this.inShift = false;
    this.dir = [];

    // Meta
    this.crouchSpeedMultiplier = 0.365;
    this.lumberDamage = 20;

    this.initEvents();
  }

  initEvents() {
    const moveKeys = {w:1,a:1,s:1,d:1};
    document.addEventListener("keydown", (e) => {
      let key = e.key.toLowerCase();
      const isMoveKey = moveKeys[key];
      const notInDir = this.dir.indexOf(key) === -1;

      if (key === 'shift') {
        e.preventDefault();
        this.inShift = true;
        this.prevSpeed = this.speed;
        this.speed = this.speed * this.crouchSpeedMultiplier;
      }
      else if (isMoveKey && notInDir) this.dir.unshift(key);
    });

    document.addEventListener("keyup", (e) => {
      let key = e.key.toLowerCase();
      const isMoveKey = moveKeys[key];
      const indexInDir = this.dir.indexOf(key);
      const inDir = indexInDir !== -1;

      if (key === 'shift') {
        this.inShift = false;
        this.speed = this.prevSpeed;
      }
      else if (isMoveKey && inDir) this.dir.splice(indexInDir, 1);
    });

    this.pushOnFrame(() => this.checkMove());
  }

  checkMove() {
    if (this.dir.length === 0) return;
    let dir = this.dir[0];

    if (dir === 'w') this.y -= this.speed;
    else if (dir === 's') this.y += this.speed;
    else if (dir === 'a') this.x -= this.speed;
    else if (dir === 'd') this.x += this.speed;
  }
};

export default Player;