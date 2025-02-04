import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { calculateSourceTotals } from '../../utils/balanceUtils';
import { Source } from '@/components/types'; 
import { fetchCurrencyRates, CurrencyRates } from '../../utils/currencyUtils'; 
import CustomButton from '../ui/CustomButton';

import styles from './filledMonth.styles';

interface Totals {
  totalUSD: number;
  totalEUR: number;
  totalUAH: number;
}

interface FilledMonthProps {
  sources: Source[];
  currentMonth: string;  // Додали currentMonth
  onEdit: () => void;
}

const formatNumber = (value: number): string => {
  if (!value) return '0,00'; 
  return value.toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function FilledMonth({ sources = [], currentMonth, onEdit }: FilledMonthProps) {
  const [totals, setTotals] = useState<Totals>({ totalUSD: 0, totalEUR: 0, totalUAH: 0 });
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({ USD: 0, EUR: 0 });
  const router = useRouter();

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchCurrencyRates("01.01.2025"); 
      setCurrencyRates(rates);
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (!sources || sources.length === 0 || currencyRates.USD === 0 || currencyRates.EUR === 0) {
      console.warn('Sources are empty or currency rates are not loaded yet');
      return;
    }
    setTotals(calculateSourceTotals(sources, currencyRates));
  }, [sources, currencyRates]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Ваш баланс:</Text>
        <Text>USD: {formatNumber(totals.totalUSD)}</Text>
        <Text>EUR: {formatNumber(totals.totalEUR)}</Text>
        <Text>UAH: {formatNumber(totals.totalUAH)}</Text>
      </View>

      <View style={styles.fixedButtonContainer}>
        <CustomButton 
          title="Редагувати" 
          onPress={onEdit}  // Використовуємо нову функцію для переходу в режим редагування
        />
      </View>
    </View>
  );
}

