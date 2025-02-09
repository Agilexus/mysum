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

import {
  getCurrencyRatesForMonth,
  CurrencyRates,
} from '@/utils/currencyUtils';

import HintBlock from '@/components/ui/HintBlock';
import CustomButton from '../ui/CustomButton';
import ComparisonBlock from '../ComparisonBlock/ComparisonBlock';

import styles from './filledMonth.styles';

interface FilledMonthProps {
  sources: Source[];
  currentMonth: string;  // формат "YYYY-MM"
  onEdit: () => void;
}

const defaultChanges: Changes = {
  usdChange: 0,
  eurChange: 0,
  uahChange: 0,
  usdPercent: '0,00',
  eurPercent: '0,00',
  uahPercent: '0,00',
  isPositive: false,
};

// Визначення, чи monthString у майбутньому порівняно з "сьогодні"
function isFutureMonth(monthString: string): boolean {
  const [y, m] = monthString.split('-').map(Number);
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;

  if (y > curYear) return true;
  if (y < curYear) return false;
  return m > curMonth;
}

// Форматування числа у вигляді "10 000,00"
const formatNumber = (value: number): string => {
  if (!value) return '0,00';
  return value
    .toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace('.', ',');
};

export default function FilledMonth({ sources = [], currentMonth, onEdit }: FilledMonthProps) {
  // Тотали для *поточного* місяця
  const [totals, setTotals] = useState<Totals>({
    totalUSD: 0,
    totalEUR: 0,
    totalUAH: 0,
    totalUAHFinal: 0,
    totalUSDFinal: 0,
    totalEURFinal: 0,
  });

  // Курси для *поточного* місяця (USD, EUR, dateUsed)
  const [currentMonthRates, setCurrentMonthRates] = useState<CurrencyRates>({
    USD: 0,
    EUR: 0,
    dateUsed: '',
  });

  // 2-й блок: різниця з попереднім місяцем
  const [previousChanges, setPreviousChanges] = useState<Changes>(defaultChanges);

  // 3-й блок: різниця з першим місяцем у цьому ж році
  const [firstMonthSameYearChanges, setFirstMonthSameYearChanges] = useState<Changes>(defaultChanges);

  // Для логіки відображення
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [sameYearIndex, setSameYearIndex] = useState(-1);

  // Рік поточного місяця (наприклад, "2025")
  const [yearStr] = currentMonth.split('-');
  const currentYear = parseInt(yearStr, 10);

  // 1) Завантажуємо курси *для поточного місяця*
  useEffect(() => {
    const loadRates = async () => {
      const rates = await getCurrencyRatesForMonth(currentMonth);
      setCurrentMonthRates(rates);
    };
    loadRates();
  }, [currentMonth]);

  // 2) Коли є джерела + курси => обчислюємо Totals поточного місяця
  useEffect(() => {
    if (sources.length && currentMonthRates.USD && currentMonthRates.EUR) {
      const curTotals = calculateSourceTotals(sources, currentMonthRates);
      setTotals(curTotals);
    }
  }, [sources, currentMonthRates]);

  // 3) Логіка порівняння (попередній місяць та перший у році)
  useEffect(() => {
    const loadComparisonData = async () => {
      // 3.1) Витягуємо monthKeys
      const allKeys = await AsyncStorage.getAllKeys();
      const monthKeys = allKeys
        .filter(k => k.startsWith('balance_'))
        .map(k => k.replace('balance_', ''))
        .sort();

      // Визначаємо індекс currentMonth у списку
      const idx = monthKeys.indexOf(currentMonth);
      setCurrentIndex(idx);

      // 2-й блок: якщо idx > 0, порівнюємо з monthKeys[idx-1]
      let prevChanges = defaultChanges;
      if (idx > 0 && totals) {
        const prevMonth = monthKeys[idx - 1];
        // Завантажуємо sources
        const prevMonthRaw = await AsyncStorage.getItem(`balance_${prevMonth}`);
        if (prevMonthRaw) {
          const prevSources = JSON.parse(prevMonthRaw) as Source[];

          // Завантажуємо курси саме для prevMonth
          const prevMonthRates = await getCurrencyRatesForMonth(prevMonth);
          const prevTotals = calculateSourceTotals(prevSources, prevMonthRates);

          prevChanges = calculateChanges(totals, prevTotals);
        }
      }
      setPreviousChanges(prevChanges);

      // 3-й блок: шукаємо всі місяці цього року, визначаємо idxSameYear
      const sameYearMonthKeys = monthKeys.filter(m => parseInt(m.split('-')[0]) === currentYear);
      const idxSameYear = sameYearMonthKeys.indexOf(currentMonth);
      setSameYearIndex(idxSameYear);

      let firstYearChanges = defaultChanges;
      if (idxSameYear >= 2 && totals) {
        const firstYearMonth = sameYearMonthKeys[0];
        // Джерела для першого місяця в поточному році
        const firstYearRaw = await AsyncStorage.getItem(`balance_${firstYearMonth}`);
        if (firstYearRaw) {
          const firstYearSources = JSON.parse(firstYearRaw) as Source[];

          // Курси для першого місяця року
          const firstYearRates = await getCurrencyRatesForMonth(firstYearMonth);
          const firstTotals = calculateSourceTotals(firstYearSources, firstYearRates);

          firstYearChanges = calculateChanges(totals, firstTotals);
        }
      }
      setFirstMonthSameYearChanges(firstYearChanges);
    };

    if (currentMonthRates.USD && currentMonthRates.EUR) {
      loadComparisonData();
    }
  }, [currentMonth, totals, currentMonthRates, currentYear]);

  // Рендер
  return (
    <View style={styles.container}>

      <View style={styles.pill}>
        <Text style={styles.infoMessage}>USD: {formatNumber(currentMonthRates.USD)}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.infoMessage}> EUR: {formatNumber(currentMonthRates.EUR)}</Text>
      </View>
      <Text>dateUsed={currentMonthRates.dateUsed}</Text>
     

      {/* Основний блок: Totals (у гривні, доларі, євро) */}
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
          <Text style={[styles.otherCurrency, { marginBottom: 12 }]}>
            <Text style={styles.currencySign}>€ </Text>
            {formatNumber(totals.totalEURFinal)}
          </Text>
        </View>

        {/* Якщо monthString в майбутньому => показуємо HintBlock з датою, за яку взято курс */}
        {isFutureMonth(currentMonth) && currentMonthRates.dateUsed && (
          <HintBlock text={`Курс валют за ${currentMonthRates.dateUsed}`} />
        )}

        <View style={styles.divider} />
      </View>

      {/* Якщо currentIndex=0 => це найперший місяць => показуємо текст */}
      {currentIndex === 0 && (
        <Text style={styles.infoMessage}>
          Чудовий початок, продовжуй заповнювати – і тут з'явиться різниця з твоїм попереднім балансом.
        </Text>
      )}

      {/* 2-й блок: якщо currentIndex >=1 */}
      {currentIndex >= 1 && (
        <ComparisonBlock
          title="Порівняння з минулим місяцем"
          changes={previousChanges}
        />
      )}

      {/* 3-й блок: якщо sameYearIndex >=2 */}
      {sameYearIndex >= 2 && (
        <ComparisonBlock
          title="Зміни від початку року"
          changes={firstMonthSameYearChanges}
        />
      )}

      <View style={styles.fixedButtonContainer}>
        <CustomButton title="Редагувати" onPress={onEdit} />
      </View>
    </View>
  );
}
