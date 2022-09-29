import dropMap from './dropMap.js';
import $ from '../../helper/dom.js';
import random from '../../helper/randomizer.js';

class Drop {
  constructor(x, y, pushOnFrame, killOnFrame, incrementEntity, player, dropId) {
    this.x = x;
    this.y = y; 
    this.pushOnFrame = pushOnFrame;
    this.killOnFrame = killOnFrame;
    this.entityId = incrementEntity();
    this.player = player;
    this.didMove = false;
    this.dropId = dropId;
    this.drop = dropMap[dropId];
    this.dropDestinationY = this.y + this.drop.fallHeight();
    this.dropSpeed = 3;
    this.moveSpeed = 1.5;
    this.interactionRange = 128;
    this.grabRange = 24;

    this.build();
    this.pushOnFrame(this.entityId, () => this.onFrame());
  }

  build() {
    this.node = $.make([this.drop.class, 'drop']);
    $.append(this.node, $.get('#ui-plane'));
    $.css(this.node, [
      ['top', this.y + (random.number(8)), 'px'],
      ['left', this.x, 'px'],
    ]);
  }

  // chase player if close
  // fall

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
      this.player.inventory.addToSlot(this.dropId);
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

  kill() {
    this.node.remove();
    this.killOnFrame(this.entityId);
  }
};

export default Drop;