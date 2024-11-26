import { db } from "../_config/firebase";
import { collection, query, doc, where, getDocs } from "firebase/firestore";

export const fetchUserLists = async (userId: any) => {
  if (!userId) {
    throw new Error("A valid userId must be provided.");
  }

  try {
    const q = query(collection(db, "lists"), where("author", "==", userId));

    const querySnapshot = await getDocs(q);

    const lists = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return lists;
  } catch (error) {
    console.error("Error fetching users lists:", error);
  }
};
