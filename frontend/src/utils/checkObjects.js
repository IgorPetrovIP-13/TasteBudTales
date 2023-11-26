export function areAllFieldsFilled(arrayOfObjects) {
  return arrayOfObjects.every((obj) => {
    return Object.values(obj).every((value) => {
      return value !== undefined && value !== null && value !== "";
    });
  });
}
