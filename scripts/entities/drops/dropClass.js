import dropMap from './dropMap.js';
import $ from '../../helper/dom.js';

class Drop {
  constructor(x, y, pushOnFrame, killOnFrame, incrementEntity, player, dropId) {
    this.x = x;
    this.y = y; 
    this.pushOnFrame = pushOnFrame;
    this.killOnFrame = killOnFrame;
    this.entityId = incrementEntity();
    this.player = player;
    this.didMove = false;
    this.drop = dropMap[dropId]

    this.build();
  }

  build() {
    this.node = $.make(this.drop.class);
    $.append(this.node, $.get('#ui-plane'));
    $.css(this.node, [
      ['top', this.y, 'px'],
      ['left', this.x, 'px'],
    ]);
  }

  // chase player if close
  // fall
};

export default Drop;