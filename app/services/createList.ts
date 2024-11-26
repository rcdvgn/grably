import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../_config/firebase";
import generateListCode from "../utils/generateListCode";

async function createList(
  userId: any,
  listTitle: any,
  description: any,
  isPrivate: any
) {
  try {
    const listCode: any = generateListCode();

    const listsCollection = collection(db, "lists");

    const newListRef = doc(listsCollection, listCode);

    const listObject = {
      author: userId,
      title: listTitle,
      description: description,
      isPrivate: isPrivate,
      items: [],
      likes: 0,
    };

    await setDoc(newListRef, listObject);

    return listCode;
  } catch (error) {
    console.error("Error creating list:", error);
    throw error;
  }
}

export default createList;
