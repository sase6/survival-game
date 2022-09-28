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
      itemId: null,
      amountOfItems: 0,
      maxStacks: 0,
      itemDurability: 100,
    };
  }
};

export default Inventory;