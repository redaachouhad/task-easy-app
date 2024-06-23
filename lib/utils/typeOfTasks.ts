export const typeOfTasks = (type: String) => {
  if (type === "todo") {
    return "Todo";
  } else if (type === "inprogress") {
    return "In progress";
  } else if (type === "done") {
    return "Done";
  }
  return null;
};
