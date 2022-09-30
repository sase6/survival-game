import Entity from "../entities/entityClass.js";
import Drop from '../entities/drops/dropClass.js';
import dropMap from "../entities/drops/dropMap.js";

class Block extends Entity {
  constructor(spawn, x, y, itemId) {
    const item = dropMap[itemId];
    super(spawn, item.block.class, x, y, false);
    this.gridIndexes = [spawn.addToGrid(x, y, item.block.gridType)];
    this.itemId = itemId;
    this.inAnimation = true;
    this.player = spawn.player;
    this.hp = 80;

    this.removeAnimation();
    this.clickEvent();
  };

  addAnimation() {
    this.inAnimation = true;
    this.node.style.animation = "200ms waddleBlock";
    this.removeAnimation();
  }

  removeAnimation() {
    setTimeout(() => {
      if (!this.inAnimation) return;
      this.node.style.animation = "none";
      this.inAnimation = false;
    }, 200);
  }

  clickEvent() {
    this.node.addEventListener("click", (e) => {

      if (!this.player.inAction) {
        const originX = this.x + 16;
        const originY = this.y + 16;
        const [playerOriginX, playerOriginY] = this.player.getOrigin(16);
        const isNotHorizontallyClose = Math.abs(playerOriginX - originX) > this.player.interactRange;
        const isNotVerticallyClose = Math.abs(playerOriginY - originY) > this.player.interactRange;

        if (isNotHorizontallyClose || isNotVerticallyClose) return;
        this.hp -= this.player.lumberDamage;
        this.addAnimation();
        if (this.hp <= 0) this.kill();
      }
    });
  }

  kill() {
    this.node.remove();
    if (this.gridIndexes !== undefined) {
      this.gridIndexes.forEach(index => {
        this.spawn.grid[index] = undefined;
      });
    }
    new Drop(this.x, this.y, this.spawn, this.itemId, 16);
  }
};

export default Block;