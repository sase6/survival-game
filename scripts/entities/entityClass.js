import $ from '../helper/dom.js';

class Entity {
    constructor(spawn, classes=[], x=0, y=0, renderOnFrame=false, hp=100, parent=$.get('#plane-1')) {
    this.x = x;
    this.y = y;
    this.health = hp;
    this.spawn = spawn;
    this.entityId = `entity-${spawn.incrementEntity()}`;
    this.player = this.spawn.player;

    this.build(classes, renderOnFrame, parent);
  }

  build(classes, renderOnFrame, parent) {
    this.node = $.make(classes);
    $.append(this.node, parent);
    if (renderOnFrame) this.spawn.pushOnFrame(this.entityId, [() => this.renderPosition()]);
    else this.renderPosition();
  }

  renderPosition() {
    $.css(
      this.node,
      [
        ['top', this.y, 'px'],
        ['left', this.x, 'px'],
        ['zIndex', (this.getOrigin(0)[1]).toString(), '']
      ]
    );
  }

  getOrigin(offsetBottom=16, yPosition=null) {
    const selfRect = this.node.getBoundingClientRect();
    const originX = ((selfRect.right - selfRect.left) / 2) + this.x;
    const originY = (selfRect.bottom - selfRect.top) + (yPosition || this.y) - offsetBottom;
    return [originX, originY];
  }

  kill() {
    this.node.remove();
    this.spawn.killOnFrame(this.entityId);
    if (this.gridIndexes !== undefined) {
      this.gridIndexes.forEach(index => {
        this.spawn.grid[index] = undefined;
      });
    }
  }
};

export default Entity;