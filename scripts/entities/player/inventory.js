import dropMap from '../drops/dropMap.js';
import $ from '../../helper/dom.js';

class Inventory {
  constructor(numberOfSlots) {
    this.slots = [];
    this.numberOfSlots = numberOfSlots;
    this.uiOpen = false;

    for (let i = 0; i < numberOfSlots; i++) {
      this.slots.push(this.newSlot());
    }

    this.initEvents();
  }

  newSlot() {
    return {
      id: null,
      amountOfItems: 0,
      maxStacks: 0,
    };
  }

  initEvents() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === 'e' && this.uiOpen === false) {
        this.uiOpen = true;
        this.buildUI();
      } else if (e.key.toLowerCase() === 'e' && this.uiOpen === true) {
        this.uiOpen = false;
        this.inventoryUI.remove();
      }
    });
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

  buildUI() {
    this.inventoryUI = $.make("inventory-ui");
    $.append(this.inventoryUI, $.get("#app"));

    // Container
    this.inventoryUIContainer = $.make('inventory-ui-container');
    $.append(this.inventoryUIContainer, this.inventoryUI);

    // Crafting Category
    this.craftCategories = $.make("craft-category-selector");
    $.append(this.craftCategories, this.inventoryUIContainer);
    $.append($.make(), this.craftCategories);
    ["Tools", "Blocks", 3, 4, 5, 6, 7, 8, 9].forEach(category => {
      const categoryElement = $.make("inventory-category");
      categoryElement.style.border = "1px solid silver";
      $.append(categoryElement, this.craftCategories);
      categoryElement.innerText = category;
    });

    // Main inventory-ui-main
    this.mainInventorySection = $.make("inventory-ui-main");
    $.append(this.mainInventorySection, this.inventoryUIContainer);
      // Search
    this.searchElement = $.make("craft-search", "input");
    $.append(this.searchElement, this.mainInventorySection);
      // Craftable Items .craftable-display
    this.craftableItems = $.make("craftable-display");
    $.append(this.craftableItems, this.mainInventorySection);
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach((index) => {
      const craftSlot = $.make(["hotbar-slot", `craft-slot-${index + 1}`]);
      craftSlot.style.border = "1px solid transparent";
      $.append(craftSlot, this.craftableItems);
    });
      // Inventory Header
    this.inventoryHeader = $.make("inventory-ui-header");
    $.append(this.inventoryHeader, this.mainInventorySection);
    const uiHeaderText = $.make("ui-header-text");
    uiHeaderText.innerText = "INVENTORY: "
    $.append(uiHeaderText, this.inventoryHeader);
    //    Inventory Space
    const extraInventorySpace = $.make("extra-inventory-space");
    $.append(extraInventorySpace, this.inventoryHeader);
    ["extra-inventory-slot-1", "extra-inventory-slot-2"].forEach(className => {
      const inventorySlotElement = $.make([className, "hotbar-slot"]);
      $.append(inventorySlotElement, extraInventorySpace);
    });
    //  Main Inventory Slots main-inventory-slots
    const mainInventorySlots = $.make("main-inventory-slots");
    $.append(mainInventorySlots, this.mainInventorySection);
    [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].forEach(slotNumber => {
      const hotbarSlot = $.make(["hotbar-slot", `hotbar-slot-${slotNumber}`]);
      $.append(hotbarSlot, mainInventorySlots);
    });

    // Gear Container
    const gearContainer = $.make("gear-container");
    $.append(gearContainer, this.inventoryUIContainer);
    $.append($.make("empty-gear-x"), gearContainer);
      // Gear
    const gearSets = $.make("gear-inventory-set");
    $.append(gearSets, gearContainer);
    [1,2,3,4].forEach((gearSet) => {
      const gearSlot = $.make(["hotbar-slot", `gear-slot-${gearSet}`]);
      $.append(gearSlot, gearSets);
    });
    
  }
};

export default Inventory;