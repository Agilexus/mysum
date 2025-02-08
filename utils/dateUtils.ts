/**
 * dateUtils.ts
 * 
 * Функції, пов'язані з "календарними" датами у форматі "YYYY-MM":
 * - Без доступу до AsyncStorage
 */

export const getCurrentMonth = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`; // Наприклад, "2025-02"
};

export const getNextMonth = (currentMonth: string): string => {
  const [year, month] = currentMonth.split('-').map(Number);
  const nextDate = new Date(year, month);
  const nextYear = nextDate.getFullYear();
  const nextMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
  return `${nextYear}-${nextMonth}`;
};

export const getRelativeMonth = (currentMonth: string, direction: 'previous' | 'next'): string => {
  const [year, month] = currentMonth.split('-').map(Number);
  let newMonth = direction === 'previous' ? month - 1 : month + 1;
  let newYear = year;

  if (newMonth === 0) {
    newMonth = 12;
    newYear -= 1;
  } else if (newMonth === 13) {
    newMonth = 1;
    newYear += 1;
  }

  return `${newYear}-${newMonth.toString().padStart(2, '0')}`;
};

export const formatMonthYear = (dateString: string): string => {
  const months = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
  ];
  const [year, month] = dateString.split('-').map(Number);
  return `${months[month - 1]} ${year}`;
};
