const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("recipes");
admin.initializeApp();

exports.addToIndex = functions.firestore
  .document("recipes/{recipeId}")
  .onCreate((snapshot) => {
    ({
      name,
      imageLink,
      category,
      cookingComplexity,
      cookingTime,
      servingsNum,
      description,
      ingredients,
      userUid,
    } = snapshot.data());
    const objectID = snapshot.id;
    return index.saveObject({
      name,
      imageLink,
      category,
      cookingComplexity,
      cookingTime,
      servingsNum,
      description,
      ingredients,
      userUid,
      objectID,
    });
  });

exports.deleteFromIndex = functions.firestore
  .document("recipes/{recipeId}")
  .onDelete((snapshot) => index.deleteObject(snapshot.id));

exports.updateRecipesOnNicknameChange = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();

    if (newData.nickname !== previousData.nickname) {
      const userId = context.params.userId;
      const newNickname = newData.nickname;

      const recipesRef = admin
        .firestore()
        .collection("recipes")
        .where("userId", "==", userId);

      return recipesRef
        .get()
        .then((snapshot) => {
          const batch = admin.firestore().batch();
          snapshot.forEach((doc) => {
            const recipeRef = admin
              .firestore()
              .collection("recipes")
              .doc(doc.id);

            batch.update(recipeRef, { authorNickname: newNickname });
          });
          return batch.commit();
        })
        .catch((error) => {
          console.error("Error:", error);
          return null;
        });
    }

    return null;
  });

exports.manageSavedRecipes = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { userId, recipeId } = req.body;

      if (!userId || !recipeId) {
        return res.status(400).json({ error: "No userId or recipeId" });
      }

      const userRef = admin.firestore().collection("users").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "No user found" });
      }

      const userData = userDoc.data();
      const savedRecipes = userData.saved || [];
      const recipeIndex = savedRecipes.indexOf(recipeId);

      const batch = admin.firestore().batch();

      if (recipeIndex !== -1) {
        savedRecipes.splice(recipeIndex, 1);
      } else {
        savedRecipes.push(recipeId);
      }

      batch.update(userRef, { saved: savedRecipes });

      await batch.commit();

      if (recipeIndex !== -1) {
        return res.status(200).json({ message: "Recipe deleted from saved" });
      } else {
        return res.status(200).json({ message: "Recipe added to saved" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error" });
    }
  });
});
