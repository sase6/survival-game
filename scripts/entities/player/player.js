import Entity from '../entityClass.js';
import Inventory from './inventory.js';
import dropMap from '../drops/dropMap.js';
import $ from '../../helper/dom.js';

class Player extends Entity {
  constructor(x, y, spawn) {
    super(x, y, 100, "player", spawn, true);
    this.dir = [];
    this.inShift = false;
    this.speed = 3.5;
    this.prevSpeed = this.speed;
    this.currentSlot = null;
  
    // Meta
    this.crouchSpeedMultiplier = 0.365;
    this.lumberDamage = 20;
    this.inventory = new Inventory(20);

    this.initEvents();
    this.scrollEvents();
    this.clickEvent();
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
        this.speed = Math.ceil(this.speed * this.crouchSpeedMultiplier);
      }
      else if (isMoveKey && notInDir) this.dir.unshift(key);
      else if (!isNaN(keyInNum) && keyInNum < 5 && keyInNum > 0) this.switchSlots(keyInNum);
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

    this.spawn.pushOnFrame(this.entityId, [() => this.checkMove()]);
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
    if (slotNumber > 4) slotNumber = 1;
    else if  (slotNumber < 1) slotNumber = 4;

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

  clickEvent() {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (this.currentSlot === null) return;

      const inventoryIndex = this.currentSlot - 1;
      const item = this.inventory.slots[inventoryIndex];
      if (item.id !== null && dropMap[item.id].placeable) {
        //place item
        const gameRect = $.get('#app').getBoundingClientRect();
        let x = e.clientX - gameRect.left;
        let y = e.clientY - gameRect.top;
        x = x - (x%32);
        y = y - (y%32);

        const gridIndex = this.spawn.getGridIndex(x, y);
        const gridBlock = this.spawn.grid[gridIndex];

        if (gridBlock !== undefined) return;
        new Entity(x, y, 100, 'blob', this.spawn, true);
      }
    });
  }
};

export default Player;