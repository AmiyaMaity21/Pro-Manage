export const formatDate = (dateString, formatType = "default") => {
  const date = dateString ? new Date(dateString) : new Date();

  const months = [
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

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  if (formatType === "us") {
    const paddedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    const formattedDateUS = `${paddedDay}/${paddedMonth}/${year}`;
    return formattedDateUS;
  } else if (dateString) {
    return `${month} ${day}${daySuffix}`;
  } else {
    return `${day}${daySuffix} ${month}, ${year}`;
  }
};

export const getUserLogo = (email) => {
  const parts = email.split("@")[0];
  return parts.slice(0, 2).toUpperCase();
};

export const isDueDatePassed = (dueDate) => {
  const currentDate = new Date();
  return (
    currentDate.setHours(0, 0, 0, 0) > new Date(dueDate).setHours(0, 0, 0, 0)
  );
};
