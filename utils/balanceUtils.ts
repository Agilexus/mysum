/**
 * balanceUtils.ts
 * 
 * Функції та типи, пов'язані з:
 *  - Обчисленням балансу (calculateSourceTotals, calculateChanges)
 *  - Отриманням списку заповнених місяців із AsyncStorage ("balance_YYYY-MM")
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Source } from '@/components/types';
import { CurrencyRates } from './currencyUtils';

/**
 * Підсумкові дані за джерелами:
 * - "фізичні" (totalUSD, totalEUR, totalUAH)
 * - сконвертовані у кожну валюту (totalUSDFinal, totalEURFinal, totalUAHFinal)
 */
export interface Totals {
  totalUSD: number;
  totalEUR: number;
  totalUAH: number;
  totalUAHFinal: number;
  totalUSDFinal: number;
  totalEURFinal: number;
}

/**
 * Різниця між двома Totals:
 * - usdChange, eurChange, uahChange: числові зміни
 * - usdPercent, eurPercent, uahPercent: форматовані відсотки
 * - isPositive: логіка визначення "чи позитивна зміна"
 */
export interface Changes {
  usdChange: number;
  eurChange: number;
  uahChange: number;
  usdPercent: string;
  eurPercent: string;
  uahPercent: string;
  isPositive: boolean;
}

/** Допоміжна ф-ція для парсингу рядків "1 234,56" -> 1234.56 */
function parseCurrencyString(value: string): number {
  if (!value) return 0;
  return parseFloat(value.replace(/\s/g, '').replace(',', '.')) || 0;
}

/**
 * Підсумовує фізичні суми у 3 валютах,
 * а також обчислює totalUAHFinal / totalUSDFinal / totalEURFinal.
 */
export function calculateSourceTotals(sources: Source[], rates: CurrencyRates): Totals {
  let totalUSD = 0;
  let totalEUR = 0;
  let totalUAH = 0;

  sources.forEach(source => {
    const usd = parseCurrencyString(source.USD);
    const eur = parseCurrencyString(source.EUR);
    const uah = parseCurrencyString(source.UAH);

    totalUSD += usd;
    totalEUR += eur;
    totalUAH += uah;
  });

  return {
    totalUSD,
    totalEUR,
    totalUAH,
    totalUAHFinal: totalUAH + totalUSD * rates.USD + totalEUR * rates.EUR,
    totalUSDFinal: totalUSD + (totalUAH / rates.USD) + (totalEUR * (rates.EUR / rates.USD)),
    totalEURFinal: totalEUR + (totalUAH / rates.EUR) + (totalUSD * (rates.USD / rates.EUR)),
  };
}

/**
 * Порівнює currentTotals і previousTotals, повертає числові зміни та відсотки.
 */
export function calculateChanges(currentTotals: Totals, previousTotals: Totals): Changes {
  const usdChange = currentTotals.totalUSDFinal - previousTotals.totalUSDFinal;
  const eurChange = currentTotals.totalEURFinal - previousTotals.totalEURFinal;
  const uahChange = currentTotals.totalUAHFinal - previousTotals.totalUAHFinal;

  const calculatePercentage = (now: number, prev: number) => {
    if (prev === 0) return '0,00';
    return ((now - prev) / prev * 100).toFixed(2).replace('.', ',');
  };

  return {
    usdChange,
    eurChange,
    uahChange,
    usdPercent: calculatePercentage(currentTotals.totalUSDFinal, previousTotals.totalUSDFinal),
    eurPercent: calculatePercentage(currentTotals.totalEURFinal, previousTotals.totalEURFinal),
    uahPercent: calculatePercentage(currentTotals.totalUAHFinal, previousTotals.totalUAHFinal),
    isPositive: (usdChange >= 0 && eurChange >= 0 && uahChange >= 0),
  };
}

/** Повертає найперший заповнений місяць або null */
export async function getFirstFilledMonth(): Promise<string | null> {
  const allKeys = await AsyncStorage.getAllKeys();
  const monthKeys = allKeys
    .filter(key => key.startsWith('balance_'))
    .map(key => key.replace('balance_', ''))
    .sort();

  return monthKeys.length > 0 ? monthKeys[0] : null;
}

/** Повертає найостанніший (найновіший) заповнений місяць або null */
export async function getLastFilledMonth(): Promise<string | null> {
  const allKeys = await AsyncStorage.getAllKeys();
  const monthKeys = allKeys
    .filter(key => key.startsWith('balance_'))
    .map(key => key.replace('balance_', ''))
    .sort();
  
  if (monthKeys.length === 0) return null;
  return monthKeys[monthKeys.length - 1];
}

/**
 * Повертає безпосередньо попередній місяць у списку
 * (тобто якщо currentMonth = monthKeys[i], ми повернемо monthKeys[i-1])
 */
export async function getPreviousFilledMonth(currentMonth: string): Promise<string | null> {
  const allKeys = await AsyncStorage.getAllKeys();
  const monthKeys = allKeys
    .filter(key => key.startsWith('balance_'))
    .map(key => key.replace('balance_', ''))
    .sort();

  const currentIndex = monthKeys.indexOf(currentMonth);
  if (currentIndex <= 0) {
    return null;
  }
  return monthKeys[currentIndex - 1];
}
