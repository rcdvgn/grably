import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/_config/firebase";

export default async function fetchListById(listId: any) {
  try {
    const docRef = doc(db, "lists", listId); // Reference to the document
    const docSnap = await getDoc(docRef); // Fetch the document

    if (docSnap.exists()) {
      return { id: listId, ...docSnap.data() };
    } else {
      console.warn(`List with ID "${listId}" not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching list:", error);
    throw error;
  }
}
