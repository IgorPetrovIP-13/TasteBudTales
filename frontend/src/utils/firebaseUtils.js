export async function manageSavedRecipes(userId, recipeId) {
  const url =
    "https://us-central1-cookingbook-2fd2f.cloudfunctions.net/manageSavedRecipes";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        recipeId: recipeId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Error(errorData.error);
    }

    const responseData = await response.json();
    return responseData.message;
  } catch (error) {
    return new Error(error.message);
  }
}