import itemMap from '../data/itemMap.js';
import Entity from './entity.js';
import $ from '../helper/dom.js';

class Item extends Entity {
  constructor(x, y, spawn, itemId, dropHeight) {
    const item = itemMap[itemId];
    super(spawn, [item.drop.class, "drop"], x, y, false, 1, $.get("#plane-1"));

    // Meta
    this.didMove = false;
    this.itemId = itemId;
    this.item = itemMap[itemId];
    this.dropSpeed = 3;
    this.moveSpeed = 1.5;
    this.interactionRange = 128;
    this.grabRange = 24;
    this.dropDestinationY = this.y + (dropHeight || this.item.drop.dropHeight);

    spawn.pushOnFrame(this.entityId, () => this.onFrame());
  }

  onFrame() {
    const originX = this.x + 8;
    const originY = this.y + 8;
    const [playerOriginX, playerOriginY] = this.player.getOrigin();
    const isHorizontallyClose = Math.abs(playerOriginX - originX) < this.interactionRange;
    const isVerticallyClose = Math.abs(playerOriginY - originY) < this.interactionRange;
    const isHorizontallyInGrabRange = Math.abs(playerOriginX - originX) < this.grabRange;
    const isVerticallyInGrabRange = Math.abs(playerOriginY - originY) < this.grabRange;

    if (isHorizontallyInGrabRange && isVerticallyInGrabRange) {
      this.kill();
      this.player.inventory.addToSlot(this.itemId);
    } else if (isHorizontallyClose && isVerticallyClose) {
      this.didMove = true;

      this.x = (originX < playerOriginX)? this.x + this.moveSpeed : this.x - this.moveSpeed;
      this.y = (originY < playerOriginY)? this.y + this.moveSpeed : this.y - this.moveSpeed;
    } else if (!this.didMove && this.y !== this.dropDestinationY) {
      if (Math.abs(this.dropDestinationY - this.y) < 5) this.y = this.dropDestinationY;
      else this.y += this.dropSpeed;
    }

    $.css(this.node, [
      ['top', this.y, 'px'],
      ['left', this.x, 'px'],
    ]);
  }
};

export default Item;