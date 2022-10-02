import itemMap from "../data/itemMap.js";
import $ from "../helper/dom.js";

class Inventory {
  constructor(numberOfSlots) {
    this.slots = [];
    this.numberOfSlots = numberOfSlots;
    this.uiOpen = false;

    this.populateSlots();
    this.toggleInventoryUI();
  }

  populateSlots() {
    for (let i = 0; i < this.numberOfSlots; i++) {
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

  toggleInventoryUI () {
    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape' && this.uiOpen) {
        this.closeUI();
        return;
      }

      if (e.key.toLowerCase() === 'i' && this.uiOpen === false) {
        this.buildUI();
      } else if (e.key.toLowerCase() === 'i' && this.uiOpen === true) {
        this.closeUI();
      }
    });
  }

  addToSlot(itemId, slotNumber, amt=1) {
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];

      if (slot.id === itemId && slot.amountOfItems < slot.maxStacks) {
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
        slot.id = itemId;
        slot.maxStacks = itemMap[itemId].maxStacks;

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
        $.get(`hotbar-slot-item-${i + 1}`).style.background = itemMap[slot.id].background;
        $.get(`hotbar-slot-item-${i + 1}`).style.backgroundSize = "cover";
      } else $.get(`hotbar-slot-item-${i + 1}`).style.background = "transparent";
      $.get(`hotbar-slot-number-${i + 1}`).innerText = slot.amountOfItems > 0? slot.amountOfItems : "";
    }
  }

  closeUI() {
    this.inventoryOverlay.remove();
    this.uiOpen = false;
  }

  buildUI() {
    this.uiOpen = true;
    this.inventoryOverlay = $.appendNew("inventory-overlay", $.get("#ui-plane"));
    const inventoryContainer = $.appendNew("inventory-container", this.inventoryOverlay);

    // Craft and Inventory Slots 
    const craftAndInventoryContainer = $.appendNew("craft-and-inventory-container", inventoryContainer);
    const craftingSearch = $.appendNew("crafting-search", craftAndInventoryContainer, "input");

      // Craftable Items Slots
    const craftingContainer = $.appendNew("crafting-container", craftAndInventoryContainer);
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map((num) => {
      const craftableSlot = $.appendNew(["craft-slot", `craft-slot-${num}`], craftingContainer);
    });

    const inventoryAndGearHeader = $.appendNew("inventory-and-gear-header", craftAndInventoryContainer);
    inventoryAndGearHeader.innerText = "Inventory";
    
    // Inventory and Gear Slots
    const inventoryAndGear = $.appendNew("inventory-and-gear-slots", craftAndInventoryContainer);
    const inventorySlots = $.appendNew("inventory-slots", inventoryAndGear);
    [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((num) => {
      const inventorySlot = $.appendNew(["hotbar-slot", `inventory-slot-${num}`], inventorySlots);
      const hotbarSlotItem = $.appendNew(["hotbar-slot-item", `hotbar-slot-item-${num}`], inventorySlot);
      const hotbarSlotNumber = $.appendNew(["hotbar-slot-number", `hotbar-slot-number-${num}`], inventorySlot);
    });
    const gearSlots = $.appendNew("gear-slots", inventoryAndGear);
    [1,2,3,4].map((num) => {
      const gearSlot = $.appendNew(["craft-slot", `gear-slot-${num}`], gearSlots);
    });

    // Category and Inventory Addon Slots
    const categoryAndInventoryAddon = $.appendNew("category-and-inventory-addon", inventoryContainer);
    const inventoryAddons = $.appendNew("inventory-addons", categoryAndInventoryAddon);
    [1,2,3,4].map((num) => $.appendNew(["hotbar-slot", `craft-category-${num}`], inventoryAddons));
    const craftCategory = $.appendNew("craft-categories", categoryAndInventoryAddon);
    [1,2,3,4].map((num) => $.appendNew(["hotbar-slot", `craft-category-${num}`], craftCategory));

    // Render
    this.renderInventory();
  }

  renderInventory() {
    const inventorySlots = this.slots.slice(4);
    for (let i = 0; i < inventorySlots.length; i++) {
      const slot = inventorySlots[i];
      const inventoryNumber = (i+1) + 4;
      if (slot.id) {
        $.get(`hotbar-slot-item-${inventoryNumber}`).style.background = itemMap[slot.id].background;
        $.get(`hotbar-slot-item-${inventoryNumber}`).style.backgroundSize = "cover";
      } else $.get(`hotbar-slot-item-${inventoryNumber}`).style.background = "transparent";
        $.get(`hotbar-slot-number-${inventoryNumber}`).innerText = slot.amountOfItems > 0? slot.amountOfItems : "";
      }
    }
};

export default Inventory;