export function norwegianDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat("nb-NO", options);
  let formattedDate = formatter.format(date);

  // Split the date, capitalize the first letter of the month, and reassemble
  formattedDate = formattedDate.split(" ");
  formattedDate[1] =
    formattedDate[1][0].toUpperCase() + formattedDate[1].slice(1);
  return formattedDate.join(" ");
}
