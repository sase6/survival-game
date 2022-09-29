import $ from '../helper/dom.js';
const emptyFunc = () => {};

class Entity {
  constructor(x=0, y=0, hp=100, classes=[], pushOnFrame, killOnFrame, incrementEntity, renderOnFrame=false, parent=$.get('#plane-1')) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.health = hp;
    this.pushOnFrame = pushOnFrame;
    this.killOnFrame = killOnFrame;
    this.entityId = `entity-${incrementEntity()}`;

    this.build(classes, renderOnFrame);
  }

  build(classes, renderOnFrame) {
    this.node = $.make(classes);
    $.append(this.node, this.parent);
    if (renderOnFrame) this.pushOnFrame(this.entityId, [() => this.renderPosition()]);
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
    this.killOnFrame(this.entityId);
  }
};

export default Entity;