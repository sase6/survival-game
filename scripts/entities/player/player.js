import Entity from '../entityClass.js';
import Inventory from './inventory.js';
import $ from '../../helper/dom.js';

class Player extends Entity {
  constructor(x, y, hp=100, speed=3.5, pushOnFrame, killOnFrame, incrementEntity) {
    super(x, y, hp, "player", pushOnFrame, killOnFrame, incrementEntity, true);
    this.dir = [];
    this.inShift = false;
    this.speed = speed;
    this.prevSpeed = speed;
    this.currentSlot = null;
    
    // Meta
    this.crouchSpeedMultiplier = 0.365;
    this.lumberDamage = 20;
    this.inventory = new Inventory(20);

    this.initEvents();
    this.scrollEvents();
  }

  initEvents() {
    const moveKeys = {w:1,a:1,s:1,d:1};
    document.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();
      const keyInNum = parseInt(key);
      const isMoveKey = moveKeys[key];
      const notInDir = this.dir.indexOf(key) === -1;

      if (key === 'shift') {
        e.preventDefault();
        this.inShift = true;
        this.prevSpeed = this.speed;
        this.speed = this.speed * this.crouchSpeedMultiplier;
      }
      else if (isMoveKey && notInDir) this.dir.unshift(key);
      
      if (!isNaN(keyInNum) && keyInNum < 5 && keyInNum > 0) this.switchSlots(keyInNum);
    });

    document.addEventListener("keyup", (e) => {
      let key = e.key.toLowerCase();
      const isMoveKey = moveKeys[key];
      const indexInDir = this.dir.indexOf(key);
      const inDir = indexInDir !== -1;

      if (key === 'shift') {
        this.inShift = false;
        this.speed = this.prevSpeed;
      }
      else if (isMoveKey && inDir) this.dir.splice(indexInDir, 1);
    });

    this.pushOnFrame(this.entityId, [() => this.checkMove()]);
  }

  checkMove() {
    if (this.dir.length === 0) return;
    let dir = this.dir[0];

    if (dir === 'w') this.y -= this.speed;
    else if (dir === 's') this.y += this.speed;
    else if (dir === 'a') this.x -= this.speed;
    else if (dir === 'd') this.x += this.speed;
  }

  switchSlots(slotNumber) {
    if (slotNumber === 5) slotNumber = 1;
    else if  (slotNumber === 0) slotNumber = 4;

    const oldSlot = $.get(`hotbar-slot-${this.currentSlot}`);
    const newSlot = $.get(`hotbar-slot-${slotNumber}`);

    if (this.currentSlot !== null) {
      oldSlot.style.background = "url(/public/assets/ui/inventory-slot.png)";
      oldSlot.style.backgroundSize = "cover";
    }

    this.currentSlot = slotNumber;
    newSlot.style.background = "url(/public/assets/ui/selected-inventory-slot.png)";
    newSlot.style.backgroundSize = "cover";
  }

  scrollEvents() {
    document.addEventListener("wheel", (e) => {
      const isUp = e.deltaY < 0;

      if (isUp) this.switchSlots(this.currentSlot - 1 || 0);
      else this.switchSlots(this.currentSlot + 1 || 4);
    });
  }
};

export default Player;