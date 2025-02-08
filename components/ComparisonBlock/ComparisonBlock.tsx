import { View, Text } from 'react-native';
import styles from './comparisonBlock.styles';

interface ComparisonBlockProps {
  title: string;
  changes: {
    usdChange: number;     // Число
    eurChange: number;     // Число
    uahChange: number;     // Число
    usdPercent: string;    // Рядок з відсотками
    eurPercent: string;
    uahPercent: string;
    isPositive: boolean;   // Загальний індикатор «зростання / падіння»
  };
}

export default function ComparisonBlock({ title, changes }: ComparisonBlockProps) {
  // Залежно від isPositive змінюємо колір бордера та заголовка
  const borderColor = changes.isPositive ? '#026C57' : '#B11212';

  // Локальна функція для форматування чисел у "10 000,00"
  const formatNumber = (value: number) => {
    return value
      .toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace('.', ',');
  };

  // Кожен рядок матиме «+», якщо число >= 0
  return (
    <View style={[styles.container, { borderColor }]}>
      <Text style={[styles.title, { color: borderColor }]}>{title}</Text>

      {/* USD */}
      <Text style={[
        styles.value,
        changes.usdChange >= 0 ? styles.positive : styles.negative
      ]}>
        {changes.usdChange >= 0 ? '+' : ''}
        {formatNumber(changes.usdChange)} $ ({changes.usdPercent} %)
      </Text>

      {/* EUR */}
      <Text style={[
        styles.value,
        changes.eurChange >= 0 ? styles.positive : styles.negative
      ]}>
        {changes.eurChange >= 0 ? '+' : ''}
        {formatNumber(changes.eurChange)} € ({changes.eurPercent} %)
      </Text>

      {/* UAH */}
      <Text style={[
        styles.value,
        changes.uahChange >= 0 ? styles.positive : styles.negative
      ]}>
        {changes.uahChange >= 0 ? '+' : ''}
        {formatNumber(changes.uahChange)} ₴ ({changes.uahPercent} %)
      </Text>
    </View>
  );
}
