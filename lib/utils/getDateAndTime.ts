export function getDateAndTime(dateTimeString: string): string {
  const dateObj = new Date(dateTimeString);

  // Get date components
  const year = dateObj.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Get time components
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  // Create date and time strings
  const datePart = `${day}-${month}-${year}`;
  const timePart = `${hours}:${minutes}:${seconds}`;

  // Combine time and date
  const formattedDateTime = `${datePart} , ${timePart}`;

  return formattedDateTime;
}
