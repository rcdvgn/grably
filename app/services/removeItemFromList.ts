import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../_config/firebase";

export default async function removeItemFromList(
  listId: string,
  itemId: number | string
) {
  try {
    const listRef = doc(db, "lists", listId);

    const listDoc = await getDoc(listRef);

    if (!listDoc.exists()) {
      throw new Error("List not found");
    }

    const currentItems = listDoc.data().items || [];

    const updatedItems = currentItems.filter((item: any) => item.id !== itemId);

    await updateDoc(listRef, {
      items: updatedItems,
    });

    return true;
  } catch (error) {
    console.error("Error removing item from list:", error);
    throw error;
  }
}
