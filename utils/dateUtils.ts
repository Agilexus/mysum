 export const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;  // Формат: "2025-01"
  };
  
  export const getNextMonth = (currentMonth: string) => {
    const [year, month] = currentMonth.split('-').map(Number);
    const nextDate = new Date(year, month);  // Наступний місяць
    const nextYear = nextDate.getFullYear();
    const nextMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
    return `${nextYear}-${nextMonth}`;
  };
  
  export const getPreviousMonth = (currentMonth: string) => {
    const [year, month] = currentMonth.split('-').map(Number);
    const prevDate = new Date(year, month - 2);  // Попередній місяць
    const prevYear = prevDate.getFullYear();
    const prevMonth = String(prevDate.getMonth() + 1).padStart(2, '0');
    return `${prevYear}-${prevMonth}`;
  };
  
  export const formatMonthYear = (dateString: string) => {
    const months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    const [year, month] = dateString.split('-').map(Number);
    return `${months[month - 1]} ${year}`;
  };