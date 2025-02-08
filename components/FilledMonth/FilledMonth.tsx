import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Source } from '@/components/types';
import {
  calculateSourceTotals,
  calculateChanges,
  Totals,
  Changes
} from '@/utils/balanceUtils'; 
import { fetchCurrencyRates, CurrencyRates } from '@/utils/currencyUtils';

import CustomButton from '../ui/CustomButton';
import ComparisonBlock from '../ComparisonBlock/ComparisonBlock';
import styles from './filledMonth.styles';

interface FilledMonthProps {
  sources: Source[];
  currentMonth: string;
  onEdit: () => void;
}

// Форматування чисел ("10 000,00")
const formatNumber = (value: number): string => {
  if (!value) return '0,00';
  return value
    .toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace('.', ',');
};

// Зміни за замовчуванням (коли попередні дані не завантажено)
const defaultChanges: Changes = {
  usdChange: 0,
  eurChange: 0,
  uahChange: 0,
  usdPercent: '0,00',
  eurPercent: '0,00',
  uahPercent: '0,00',
  isPositive: false,
};

export default function FilledMonth({ sources = [], currentMonth, onEdit }: FilledMonthProps) {
  const [totals, setTotals] = useState<Totals>({
    totalUSD: 0,
    totalEUR: 0,
    totalUAH: 0,
    totalUAHFinal: 0,
    totalUSDFinal: 0,
    totalEURFinal: 0,
  });

  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({ USD: 0, EUR: 0 });

  // Для обчислення 2-го блоку: попередній місяць (відносно currentMonth в списку)
  const [previousMonthData, setPreviousMonthData] = useState<Source[] | null>(null);
  const [previousChanges, setPreviousChanges] = useState<Changes>(defaultChanges);

  // Для обчислення 3-го блоку: найперший місяць у списку
  const [firstMonthData, setFirstMonthData] = useState<Source[] | null>(null);
  const [firstMonthChanges, setFirstMonthChanges] = useState<Changes>(defaultChanges);

  // Поточний індекс у масиві monthKeys
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // 1) Завантажуємо курси з API (один раз)
  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchCurrencyRates('01.01.2025');
      setCurrencyRates(rates);
    };
    fetchRates();
  }, []);

  // 2) Коли змінилися sources або курси – рахуємо totals
  useEffect(() => {
    if (sources.length && currencyRates.USD && currencyRates.EUR) {
      setTotals(calculateSourceTotals(sources, currencyRates));
    }
  }, [sources, currencyRates]);

  // 3) Головна логіка завантаження:
  //    - Дістаємо всі місяці (monthKeys)
  //    - Знаходимо currentIndex
  //    - Якщо currentIndex > 0 => завантажуємо "попередній" місяць
  //    - Якщо currentIndex >= 2 => завантажуємо "найперший" місяць
  //    - Обчислюємо зміни (previousChanges, firstMonthChanges)
  useEffect(() => {
    const loadData = async () => {
      try {
        // 3.1) Отримуємо список усіх "balance_YYYY-MM"
        const allKeys = await AsyncStorage.getAllKeys();
        const monthKeys = allKeys
          .filter(k => k.startsWith('balance_'))
          .map(k => k.replace('balance_', ''))
          .sort();

        // Знаходимо індекс поточного місяця в цьому списку
        const idx = monthKeys.indexOf(currentMonth);
        setCurrentIndex(idx);

        // Якщо idx>0 => завантажуємо monthKeys[idx-1]
        let loadedPrevData: Source[] | null = null;
        if (idx > 0) {
          const prevKey = `balance_${monthKeys[idx - 1]}`;
          const prevData = await AsyncStorage.getItem(prevKey);
          loadedPrevData = prevData ? JSON.parse(prevData) : null;
          setPreviousMonthData(loadedPrevData);
        } else {
          // Якщо idx=0 (або -1, не знайшли), то попереднього немає
          setPreviousMonthData(null);
        }

        // Якщо idx >= 2 => завантажуємо monthKeys[0] (найперший)
        let loadedFirstData: Source[] | null = null;
        if (idx >= 2) {
          const firstKey = `balance_${monthKeys[0]}`; // найперший
          const firstData = await AsyncStorage.getItem(firstKey);
          loadedFirstData = firstData ? JSON.parse(firstData) : null;
          setFirstMonthData(loadedFirstData);
        } else {
          setFirstMonthData(null);
        }

        // ****** Обчислюємо зміни, якщо в нас є totals і завантажені дані
        // Можемо обчислити прямо тут, щоби уникнути додаткових useEffect
        if (totals && currencyRates.USD && currencyRates.EUR) {
          // 2-й блок
          if (loadedPrevData) {
            const prevTotals = calculateSourceTotals(loadedPrevData, currencyRates);
            setPreviousChanges(calculateChanges(totals, prevTotals));
          } else {
            setPreviousChanges(defaultChanges);
          }

          // 3-й блок
          if (loadedFirstData) {
            const fmTotals = calculateSourceTotals(loadedFirstData, currencyRates);
            setFirstMonthChanges(calculateChanges(totals, fmTotals));
          } else {
            setFirstMonthChanges(defaultChanges);
          }
        } else {
          // Якщо totals не готовий, скинемо зміни
          setPreviousChanges(defaultChanges);
          setFirstMonthChanges(defaultChanges);
        }
      } catch (err) {
        console.error('Error loading comparison data:', err);
      }
    };

    loadData();
  }, [currentMonth, totals, currencyRates]);

  // Функція перевірки, чи всі зміни = 0
  const isZeroChanges = (ch: Changes) =>
    ch.usdChange === 0 && ch.eurChange === 0 && ch.uahChange === 0;

  // **** РЕНДЕР ****
  return (
    <View style={styles.container}>

      {/* Головний блок (загальний підсумок) */}
      <View style={styles.mainBlock}>
        <View style={styles.mainCurrency}>
          <Text style={styles.uahAmount}>
            <Text style={styles.currencySign}>₴ </Text>
            {formatNumber(totals.totalUAHFinal)}
          </Text>
        </View>

        <View style={styles.secondaryCurrency}>
          <Text style={styles.otherCurrency}>
            <Text style={styles.currencySign}>$ </Text>
            {formatNumber(totals.totalUSDFinal)}
          </Text>
          <Text style={styles.otherCurrency}>
            <Text style={styles.currencySign}>€ </Text>
            {formatNumber(totals.totalEURFinal)}
          </Text>
        </View>

        <View style={styles.divider} />
      </View>

      {/* 1) Якщо currentIndex=0 => "Чудовий початок..." */}
      {currentIndex === 0 && (
        <Text style={styles.infoMessage}>
          Чудовий початок, продовжуй заповнювати – і тут з'явиться різниця з твоїм попереднім балансом.
        </Text>
      )}

      {/* 2) Якщо currentIndex >= 1 => показуємо 2-й блок (порівняння з попереднім),
             але лише якщо зміни не = 0 */}
      {currentIndex >= 1 && !isZeroChanges(previousChanges) && (
        <ComparisonBlock
          title="Порівняння з попереднім місяцем"
          changes={previousChanges}
        />
      )}

      {/* 3) Якщо currentIndex >= 2 => показуємо 3-й блок (порівняння з першим),
             але лише якщо зміни не = 0 */}
      {currentIndex >= 2 && !isZeroChanges(firstMonthChanges) && (
        <ComparisonBlock
          title="Порівняння з першим заповненим місяцем"
          changes={firstMonthChanges}
        />
      )}

      <View style={styles.fixedButtonContainer}>
        <CustomButton title="Редагувати" onPress={onEdit} />
      </View>
    </View>
  );
}
