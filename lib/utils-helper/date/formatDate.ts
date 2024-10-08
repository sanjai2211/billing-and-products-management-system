export function formatDate(
  dateString: string | null | undefined,
  showTime = true
): { date: string; time: string } {
  if (!dateString) {
    return { date: "-", time: "-" };
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return { date: "-", time: "-" };
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = showTime
    ? date.toLocaleTimeString("en-US", timeOptions)
    : "-";

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
