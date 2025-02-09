import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CurrencyRates {
  USD: number;
  EUR: number;
  dateUsed: string;  // Нова властивість
}

// Перевіряє, чи monthString у майбутньому (YYYY-MM > поточний YYYY-MM)
function isFutureMonth(monthString: string): boolean {
  const [y, m] = monthString.split('-').map(Number);
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;

  if (y > curYear) return true;
  if (y < curYear) return false;
  return m > curMonth;
}

// Функція будує YYYYMMDD для 1-го числа або "сьогодні"
function buildDateParam(monthString: string): { yyyymmdd: string; isFuture: boolean } {
  const now = new Date();
  const future = isFutureMonth(monthString);

  if (future) {
    // Сьогодні
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return { yyyymmdd: `${yyyy}${mm}${dd}`, isFuture: true };
  } else {
    // 1-е число
    const [year, month] = monthString.split('-');
    const yyyymmdd = `${year}${month.padStart(2, '0')}01`;  // напр. "20241101"
    return { yyyymmdd, isFuture: false };
  }
}

// Фетчимо курс із ?date=YYYYMMDD
async function fetchRatesByDateParam(yyyymmdd: string): Promise<Omit<CurrencyRates, 'dateUsed'>> {
  const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${yyyymmdd}&json`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      return { USD: 0, EUR: 0 };
    }

    const usdRate = data.find((item: any) => item.cc === "USD")?.rate ?? 0;
    const eurRate = data.find((item: any) => item.cc === "EUR")?.rate ?? 0;
    return { USD: usdRate, EUR: eurRate };
  } catch (err) {
    console.error('fetchRatesByDateParam error:', err);
    return { USD: 0, EUR: 0 };
  }
}

/**
 * Основна функція: якщо курс збережений, повертаємо його,
 * інакше фетчимо. Тепер зберігаємо і dateUsed.
 */
export async function getCurrencyRatesForMonth(monthString: string): Promise<CurrencyRates> {
  const storageKey = `currencyRates_${monthString}`;
  const saved = await AsyncStorage.getItem(storageKey);

  if (saved) {
    // Парсимо і повертаємо
    return JSON.parse(saved);
  }

  // Будуємо дату
  const { yyyymmdd, isFuture } = buildDateParam(monthString);

  // Фетчимо
  const basicRates = await fetchRatesByDateParam(yyyymmdd);

  // Формуємо об'єкт з dateUsed
  // Формат DD.MM.YYYY
  // yyyymmdd = '20260209'
  // dd=09, mm=02, yyyy=2026
  const yyyy = yyyymmdd.slice(0, 4);
  const mm = yyyymmdd.slice(4, 6);
  const dd = yyyymmdd.slice(6, 8);
  const dateUsed = `${dd}.${mm}.${yyyy}`;

  const ratesToSave: CurrencyRates = {
    ...basicRates,
    dateUsed,  // зберігаємо форматовану дату
  };

  await AsyncStorage.setItem(storageKey, JSON.stringify(ratesToSave));
  return ratesToSave;
}
