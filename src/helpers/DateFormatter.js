export const getActualDate = () => {
  const givenDate = new Date();

  // Formatieren Sie das Datum nach Ihren Wünschen
  const day = givenDate.getDate().toString().padStart(2, "0");
  const month = (givenDate.getMonth() + 1).toString().padStart(2, "0"); // Monate sind nullbasiert
  const year = givenDate.getFullYear();
  const hours = givenDate.getHours().toString().padStart(2, "0");
  const minutes = givenDate.getMinutes().toString().padStart(2, "0");
  const seconds = givenDate.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
