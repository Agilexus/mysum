export const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Місяці починаються з 0
  
    return `${year}-${month}`; // Формат: "2025-01"
  };

  // 🔥 Функція для перетворення формату в назву місяця
  export const formatMonthYear = (monthKey: string): string => {
    const [year, month] = monthKey.split('-');
    const monthsInUkrainian = [
      'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
      'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];
  
    const monthIndex = parseInt(month, 10) - 1;  // Конвертуємо '02' у 1
    return `${monthsInUkrainian[monthIndex]} ${year}`;
  };