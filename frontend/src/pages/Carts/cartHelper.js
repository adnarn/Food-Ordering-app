export function updateItemsArray(items, newItem) {
    const index = items.findIndex(item => item.id === newItem.id);
    if (index !== -1) {
      items[index].quantity += newItem.quantity;
    } else {
      items.push(newItem);
    }
    return items;
  }
  