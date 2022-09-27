import Entity from "../entityClass.js";
import random from '../../helper/randomizer.js';
import $ from '../../helper/dom.js';

class Deer extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 60, ['default_entity', 'deer'], pushOnFrame, false);
    this.player = player;
    this.isLeft = random.percent(50);

    // Meta
    this.maxWanderRange = 165;
    this.minWanderRange = 63.5;
    this.speed = 0.85;
    this.maxTimeToWander = 15000;
    this.minTimeToWander = 3500;

    this.faceDirection();
    this.move();
    this.pushOnFrame(() => this.checkMove());
  }

  faceDirection() {
    if (this.isLeft) this.node.style.transform = "rotateY(180deg)";
    else this.node.style.transform = "rotateY(0deg)";
  }

  move() {
    setTimeout(() => {
      const xDistance = random.number(this.maxWanderRange, this.minWanderRange);
      const yDistance = random.number(this.maxWanderRange, this.minWanderRange);
      this.xDestination = random.percent(50)? this.x - xDistance : this.x + xDistance;
      this.yDestination = random.percent(50)? this.y - yDistance : this.y + yDistance;
      this.move();
    }, random.number(this.maxTimeToWander, this.minTimeToWander));
  }

  checkMove() {
    if (this.xDestination && this.xDestination !== this.x) {
      if (Math.abs(this.xDestination - this.x) < this.speed) this.x = this.xDestination;
      else {
        this.x = this.xDestination > this.x? this.x + this.speed : this.x - this.speed;
        this.isLeft = this.xDestination < this.x;
      }
    }

    if (this.yDestination && this.yDestination !== this.y) {
      if (Math.abs(this.yDestination - this.y) < this.speed) this.y = this.yDestination;
      else {
        this.y = this.yDestination > this.y? this.y + this.speed : this.y - this.speed;
      }
    }

    this.faceDirection();
    $.css(this.node, [
      ['top', this.y, 'px'],
      ['left', this.x, 'px'],
      ['zIndex', (this.y + 64).toString(), '']
    ]);
  }
};

export default Deer;