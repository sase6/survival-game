import Entity from '../entityClass.js';
import random from '../../helper/randomizer.js';
import $ from '../../helper/dom.js';

class Tree extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 300, 'default-tree', pushOnFrame, true);
    this.player = player;
    this.addShadow();
    this.node.style.zIndex = `${parseInt(this.y + 128)}`;
    
    //Meta
    this.interactRange = 48;
    this.shakeAnimationTime = 120;
    this.fallTime = 2000;

    this.initEvents();
  }

  initEvents() {
    this.node.addEventListener("click", () => {
      if (this.health <= 0) return;
      this.health -= this.player.lumberDamage;
      const isDead = this.health <= 0;
      const [playerOriginX, playerOriginY] = this.player.getOrigin();
      const [treeOriginX, treeOriginY] = this.getOrigin();
      const isCloseOnX = Math.abs(playerOriginX - treeOriginX) <= this.interactRange;
      const isCloseOnY = Math.abs(playerOriginY - treeOriginY) <= this.interactRange;

      if (isCloseOnX && isCloseOnY) {
        this.node.style.animation = `${isDead? this.fallTime : this.shakeAnimationTime}ms tree-${isDead? "fall" : "shake"}-${playerOriginX > treeOriginX? "left": "right"} forwards`;
        if (isDead) this.beforeDeath();
        setTimeout(() => {
          this.node.style.animation = "";
          if (isDead) this.onDeath();
        }, (isDead? this.fallTime : this.shakeAnimationTime));
        
      } else return;
    });
  }

  addShadow() {
    this.shadow = $.make('pine-tree-shadow');
    $.append(this.shadow, $.get('#shadow-layer'));
    $.css(this.shadow, [
      ['top', this.y + 102, 'px'],
      ['left', this.x + 13, 'px']
    ]);
  }

  beforeDeath() {
    for (let i = 0; i < random.number(5,3); i++) {
      const randomTime = random.number(320, 50);
      setTimeout(() => {
        new woodenDrop(this.x + random.number(54, 10), this.y, this.pushOnFrame, this.player);
      }, randomTime);
    }
  }

  onDeath() {
    this.node.remove();
  }
}

export default Tree;

class woodenDrop extends Entity {
  constructor(x, y, pushOnFrame, player) {
    super(x, y, 0, 'spruce-log-drop', pushOnFrame, true);
    this.player = player;

    this.startX = x;
    this.startY = y;
    this.interactRange = 150;
    this.grabRange = 32;
    this.speed = 1;
    this.moved = false;
    this.pushOnFrame(() => {this.chasePlayer()});
  }

  chasePlayer() {
    let [playerX, playerY] = this.player.getOrigin(16);
    let [nodeX, nodeY] = this.getOrigin(8);

    const inHorizontalRange = Math.abs(playerX - nodeX) <= this.interactRange;
    const inVerticalRange = Math.abs(playerY - nodeY) <= this.interactRange;
    const inHorizontalGrabRange = Math.abs(playerX - nodeX) <= this.grabRange;
    const inVerticalGrabRange = Math.abs(playerY - nodeY) <= this.grabRange;

    if (inHorizontalGrabRange && inVerticalGrabRange) return this.node.remove();

    if (inHorizontalRange && inVerticalRange) {
      this.moved = true;
      if (playerX < nodeX) this.x -= this.speed;
      else this.x += this.speed;

      if (playerY < nodeY) this.y -= this.speed;
      else this.y += this.speed;
    } else if (this.y < (this.startY + 128) && !this.moved) {
      this.y += this.speed;
    }
  }
};