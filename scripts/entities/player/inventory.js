import dropMap from '../drops/dropMap.js';
import $ from '../../helper/dom.js';

class Inventory {
  constructor(numberOfSlots) {
    this.slots = [];
    this.numberOfSlots = numberOfSlots;

    for (let i = 0; i < numberOfSlots; i++) {
      this.slots.push(this.newSlot());
    }
  }

  newSlot() {
    return {
      id: null,
      amountOfItems: 0,
      maxStacks: 0,
    };
  }

  addToSlot(id, slotNumber, amt=1) {
    // if (slotNumber) {
    //   // Later
    //   return;
    // }

    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];

      if (slot.id === id && slot.amountOfItems < slot.maxStacks) {
        const maxToAdd = slot.maxStacks - slot.amountOfItems;
        if (amt > maxToAdd) {
          slot.amountOfItems += maxToAdd;
          amt = amt - maxToAdd;
          continue;
        } else {
          slot.amountOfItems += amt;
          break;
        }

      } else if (slot.id === null) {
        slot.id = id;
        slot.maxStacks = dropMap[id].maxStack;

        if (amt > slot.maxStacks) {
          slot.amountOfItems = slot.maxStacks;
          amt -= slot.maxStacks;
          continue;
        } else {
          slot.amountOfItems = amt;
          break;
        }
      }
    }

    this.renderHotbar();
  }

  removeFromInventory(slotNumber, amt=1) {
    this.slots[slotNumber].amountOfItems -= amt;
    if (this.slots[slotNumber].amountOfItems === 0) {
      this.slots[slotNumber] = this.newSlot();
    }

    this.renderHotbar();
  }

  renderHotbar() {
    const hotbar = this.slots.slice(0, 4);
    for (let i = 0; i < hotbar.length; i++) {
      const slot = hotbar[i];
      if (slot.id) {
        $.get(`hotbar-slot-item-${i + 1}`).style.background = dropMap[slot.id].backgroundImage;
        $.get(`hotbar-slot-item-${i + 1}`).style.backgroundSize = "cover";
      } else $.get(`hotbar-slot-item-${i + 1}`).style.background = "transparent";
      $.get(`hotbar-slot-number-${i + 1}`).innerText = slot.amountOfItems > 0? slot.amountOfItems : "";
    }
  }
};

export default Inventory;