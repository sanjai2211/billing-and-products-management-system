export function formatDate(
  dateString: string | null | undefined,
  showTime = true
): string {
  if (!dateString) {
    return "-";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "-";
  }

  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (showTime) {
    options = {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  }

  return date.toLocaleDateString("en-US", options);
}
