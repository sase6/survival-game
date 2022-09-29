import Entity from '../entityClass.js';
import Drop from '../drops/dropClass.js';
import random from '../../helper/randomizer.js';
import $ from '../../helper/dom.js';

class Tree extends Entity {
  constructor(x, y, spawn) {
    const treeHp = 300;
    super(spawn, 'default-tree', x, y, false, treeHp);
    
    // Meta
    this.interactRange = 48;
    this.shakeAnimationTime = 120;
    this.fallTime = 2000;

    // Functions
    this.node.style.zIndex = `${parseInt(this.y + 128)}`;
    this.initEvents();
    this.addShadow();
    this.setGridIndexes();
  }

  setGridIndexes() {
    const yOffset = this.y + 96;
    const xOffset = this.x + 32;
    const gridIndex1 = this.spawn.addToGrid(this.x, yOffset, 2);
    const gridIndex2 = this.spawn.addToGrid(xOffset, yOffset, 2);
    this.gridIndexes = [gridIndex1, gridIndex2];
  }

  initEvents() {
    this.node.addEventListener("click", () => {
      if (this.health <= 0) return;
      this.health -= this.spawn.player.lumberDamage;
      const isDead = this.health <= 0;
      const [playerOriginX, playerOriginY] = this.spawn.player.getOrigin();
      const [treeOriginX, treeOriginY] = this.getOrigin();
      const isCloseOnX = Math.abs(playerOriginX - treeOriginX) <= this.interactRange;
      const isCloseOnY = Math.abs(playerOriginY - treeOriginY) <= this.interactRange;

      if (isCloseOnX && isCloseOnY) {
        this.node.style.animation = `${isDead? this.fallTime : this.shakeAnimationTime}ms tree-${isDead? "fall" : "shake"}-${playerOriginX > treeOriginX? "left": "right"} forwards`;
        if (isDead) this.beforeDeath();
        setTimeout(() => {
          this.node.style.animation = "";
          if (isDead) this.kill();
        }, (isDead? this.fallTime : this.shakeAnimationTime));
        
      } else return;
    });
  }

  addShadow() {
    this.shadow = $.make('pine-tree-shadow');
    $.append(this.shadow, $.get('#shadow-layer'));
    $.css(this.shadow, [
      ['top', this.y + 102, 'px'],
      ['left', this.x + 13, 'px'],
      ['zIndex', 2, ' '],
    ]);
  }

  beforeDeath() {
    this.shadow.remove();
    this.dropLoot();
  }

  dropLoot() {
    for (let i = 0; i < random.number(5,3); i++) {
      const randomTime = random.number(320, 50);

      setTimeout(() => {
        new Drop(this.x + random.number(54, 10), this.y, this.spawn, 1);
      }, randomTime);
    }
  }
}

export default Tree;