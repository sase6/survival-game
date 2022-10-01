import Entity from "../entity/entity.js";
import Item from "../entity/item.js";
import random from "../helper/randomizer.js";
import $ from "../helper/dom.js";
import itemMap from "../data/itemMap.js";

class Tree extends Entity {
  constructor(x, y, spawn) {
    super(spawn, 'default-tree', x, y, false, 300);
    
    // Meta
    this.interactRange = 32;
    this.shakeAnimation = "tree-shake-";
    this.fallAnimation = "tree-fall-";
    this.shakeAnimationTime = 120;
    this.fallTime = 2000;
    this.maxDrop = 5;
    this.minDrop = 2;

    // Functions
    // this.node.style.zIndex = `${parseInt(this.y + 128)}`;
    this.setGridIndexes();
    this.makeShadow();
    // this.initEvents();
    // this.addShadow();
  }

  setGridIndexes() {
    const yOffset = this.y + 96;
    const xOffset = this.x + 32;
    const gridIndex1 = this.spawn.addToGrid(this.x, yOffset, 2);
    const gridIndex2 = this.spawn.addToGrid(xOffset, yOffset, 2);
    this.gridIndexes = [gridIndex1, gridIndex2];
  }

  beforeDeath(dir) {
    this.isDead = true;
    this.shadow.remove();
    this.dropLoot();

    this.animate(`${this.fallAnimation}${dir}`, this.fallTime, "forwards");
    setTimeout(() => {
      this.kill();
    }, this.fallTime);
  }

  onClick(playerInRange, xDistance, yDistance) {
    if (!playerInRange || xDistance > this.interactRange || yDistance > this.interactRange || this.isDead) return;
    this.health -= this.player.lumberDamage;
    const isDead = this.health <= 0;
    const [originX] = this.getOrigin();
    const [playerOriginX] = this.player.getOrigin();
    const dir = originX < playerOriginX? "left" : "right";

    if (isDead) {
      this.beforeDeath(dir);
    } else {
      this.animate(`${this.shakeAnimation}${dir}`, this.shakeAnimationTime);
    }
  }

  makeShadow() {
    this.shadow = $.make('pine-tree-shadow');
    $.append(this.shadow, $.get('#shadow-layer'));
    $.css(this.shadow, [
      ['top', this.y + 102, 'px'],
      ['left', this.x + 13, 'px'],
      ['zIndex', 2, ' '],
    ]);
  }

  dropLoot() {
    const dropAmount = parseInt(random.number(this.maxDrop, this.minDrop));
    console.log(dropAmount);
    for (let i = 0; i <= dropAmount; i++) {
      new Item(this.x, this.y, this.spawn, 3);
    }
  }
}

export default Tree;