import { db } from "../firebase";
import { ref as dbRef, get, update } from "firebase/database";
import { toast } from "react-toastify";

export async function checkIsSaved(recipeID, setIsSaved, uid) {
  try {
    const snapshot = (await get(dbRef(db, "users/" + uid))).val();
    if (snapshot.saved !== undefined) {
      if (snapshot.saved.includes(recipeID)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      setIsSaved(false);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function handleSave(isSaved, recipeID, setIsSaved, uid) {
  const userRef = dbRef(db, "users/" + uid);
  try {
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    const savedSet = new Set(userData.saved || []);
    isSaved ? savedSet.delete(recipeID) : savedSet.add(recipeID);
    await update(userRef, {
      saved: [...savedSet],
    });
    if (!isSaved) {
      console.log(1)
      setIsSaved(true);
      toast.success("Recipe saved");
    } else {
      setIsSaved(false);
      toast.success("Recipe unsaved");
    }
  } catch (e) {
    console.error(e);
  }
}
