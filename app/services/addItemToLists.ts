import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../_config/firebase";

async function addItemToLists(
  userId: any,
  lists: any,
  mediaId: any,
  mediaType: any
) {
  try {
    for (const listId of lists) {
      const listQuery = doc(db, "lists", listId);

      const listDoc = await getDoc(listQuery);

      if (listDoc.exists() && listDoc.data().author === userId) {
        const currentItems = listDoc.data().items || [];

        const isItemAlreadyExists = currentItems.some(
          (existingItem: any) =>
            existingItem.id === mediaId && existingItem.mediaType === mediaType
        );

        if (!isItemAlreadyExists) {
          const updatedItems = [
            ...currentItems,
            { id: mediaId, mediaType: mediaType },
          ];

          await updateDoc(listQuery, {
            items: updatedItems,
          });
        }
      }
    }

    return true;
  } catch (error) {
    // Log the error and rethrow to allow caller to handle
    console.error("Error adding item to lists:", error);
    throw error;
  }
}

export default addItemToLists;
