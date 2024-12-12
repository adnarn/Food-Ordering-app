import { firestore, auth } from "./firebaseConfig";

// Add item to cart
export async function addItemToCart(item) {
  const userId = auth.currentUser.uid;
  const cartRef = firestore.collection("carts").doc(userId);

  await firestore.runTransaction(async (transaction) => {
    const doc = await transaction.get(cartRef);
    const items = doc.exists ? doc.data().items : [];

    // Example function to update items (implement the logic as needed)
    const updatedItems = updateItemsArray(items, item);
    transaction.set(cartRef, { items: updatedItems, updatedAt: new Date() }, { merge: true });
  });
}

// Retrieve cart items
export async function getCartItems() {
  const userId = auth.currentUser.uid;
  const cartRef = firestore.collection("carts").doc(userId);
  const doc = await cartRef.get();
  return doc.exists ? doc.data().items : [];
}

// Update or remove items as necessary
