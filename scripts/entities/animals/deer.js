import Entity from "../entityClass.js";
import random from '../../helper/randomizer.js';
import $ from '../../helper/dom.js';

class Deer extends Entity {
  constructor(x, y, pushOnFrame, killOnFrame, incrementEntity, player) {
    super(x, y, 60, ['default_entity', 'deer'], pushOnFrame, killOnFrame, incrementEntity, false, $.get("#plane-1"));
    this.player = player;
    this.isLeft = random.percent(50);

    // Meta
    this.maxWanderRange = 165;
    this.minWanderRange = 63.5;
    this.speed = 0.85;
    this.maxTimeToWander = 15000;
    this.minTimeToWander = 3500;
    this.playerAlertRange = 125;

    this.faceDirection();
    this.move();
    this.pushOnFrame(this.entityId, () => this.checkMove());
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
    const [playerX, playerY] = this.player.getOrigin(16);
    const [nodeX, nodeY] = this.getOrigin(16);

    if ((Math.abs(playerX - nodeX) <= this.playerAlertRange) && (Math.abs(playerY - nodeY) <= this.playerAlertRange) && this.player.speed >= 3.5) {
      const isPlayerLeft = playerX < nodeX;
      const isPlayerAbove = playerY < nodeY;
      const goingHorizontally = random.percent(50);
      
      if (goingHorizontally) {
        this.xDestination = isPlayerLeft? this.x + this.maxWanderRange : this.x - this.maxWanderRange;
      } else {
        this.yDestination = isPlayerAbove? this.y + this.maxWanderRange : this.y - this.maxWanderRange;
      }
    }

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
      ['zIndex', parseInt(this.y + 64), '']
    ]);
  }
};

export default Deer;