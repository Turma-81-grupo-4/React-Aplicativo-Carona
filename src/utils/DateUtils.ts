// src/utils/dateUtils.ts

export function formatFullDateTime(dateString: string | undefined): string {
  if (!dateString) return "";
  const date = new Date(dateString);

 
  const formattedDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

 
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  });

 
  return `${formattedDate} - ${formattedTime}`;
}