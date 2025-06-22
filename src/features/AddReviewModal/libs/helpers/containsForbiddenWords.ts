// Функция проверки на запрещенные слова
export const containsForbiddenWords = (text: string): boolean => {
  const forbiddenWords = ["fiverr", "freelancer"];
  const lowerText = text.toLowerCase();
  return forbiddenWords.some((word) => lowerText.includes(word));
};
