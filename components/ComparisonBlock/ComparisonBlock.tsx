import { View, Text } from 'react-native';
import styles from './comparisonBlock.styles';

interface ComparisonBlockProps {
  title: string;
  changes: {
    usdChange: number;
    eurChange: number;
    uahChange: number;
    usdPercent: string;
    eurPercent: string;
    uahPercent: string;
    isPositive: boolean;
  };
}

// Функція для форматування +/-
function getSign(value: number): string {
  if (value > 0) return '+';
  if (value < 0) return '-';
  return '';
}

// Функція для стилів кольору
function getValueStyle(value: number) {
  return value >= 0 ? styles.positive : styles.negative;
}

function formatNumber(value: number): string {
  // Якщо хочеш 0,00 без знака –
  // і далі "±" проставляєш самостійно через getSign().
  return Math.abs(value) // використовуємо модуль, щоб не дублювати знак
    .toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace('.', ',');
}

export default function ComparisonBlock({ title, changes }: ComparisonBlockProps) {
  // Колір заголовка беремо з isPositive
  const color = changes.isPositive ? '#026C57' : '#B11212';

  // Приклад: кожну валюту обробляємо окремо
  // (UAH)
  const signUAH = getSign(changes.uahChange);
  const styleUAH = getValueStyle(changes.uahChange);

  // (USD)
  const signUSD = getSign(changes.usdChange);
  const styleUSD = getValueStyle(changes.usdChange);

  // (EUR)
  const signEUR = getSign(changes.eurChange);
  const styleEUR = getValueStyle(changes.eurChange);

  return (
    <View style={styles.container}> 
      <Text style={[styles.title, { color }]}>{title}</Text>

      {/* UAH */}
      <View style={styles.row}>
        <Text style={[styles.value, styleUAH]}>
          ₴ {signUAH}{formatNumber(changes.uahChange)}
        </Text>
        <Text style={[styles.value, styleUAH]}>
          {changes.uahPercent} %
        </Text>
      </View>

      {/* USD */}
      <View style={styles.row}>
        <Text style={[styles.value, styleUSD]}>
          $ {signUSD}{formatNumber(changes.usdChange)}
        </Text>
        <Text style={[styles.value, styleUSD]}>
          {changes.usdPercent} %
        </Text>
      </View>

      {/* EUR */}
      <View style={styles.row}>
        <Text style={[styles.value, styleEUR]}>
          € {signEUR}{formatNumber(changes.eurChange)}
        </Text>
        <Text style={[styles.value, styleEUR]}>
          {changes.eurPercent} %
        </Text>
      </View>
    </View>
  );
}
