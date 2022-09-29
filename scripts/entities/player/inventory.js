import dropMap from '../drops/dropMap.js';

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
  }
};

export default Inventory;