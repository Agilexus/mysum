import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({
  label, 
  placeholder, 
  style, 
  value, 
  onChangeText,
  allowNumbersOnly = false
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasLabel = Boolean(label); 


  // Обробник зміни тексту (кожна літера, що вводиться)
  const handleChangeText = (text) => {
    // Якщо не вмикаємо "числовий" режим, просто викликаємо onChangeText
    if (!allowNumbersOnly) {
      onChangeText?.(text);
      return;
    }

    // 1) Залишаємо тільки цифри, кому і пробіли
    let cleaned = text.replace(/[^0-9,\s]/g, '');

    // 2) Дозволяємо лише одну кому (видаляємо всі наступні)
    const firstCommaIndex = cleaned.indexOf(',');
    if (firstCommaIndex !== -1) {
      // "розрізаємо" рядок і замінюємо коми праворуч
      cleaned =
        cleaned.slice(0, firstCommaIndex + 1) +
        cleaned.slice(firstCommaIndex + 1).replace(/,/g, '');
    }

    onChangeText?.(cleaned);
  };

  // Обробник втрати фокуса: форматуємо
  const handleBlur = () => {
    setIsFocused(false);

    if (allowNumbersOnly && value) {
      // 1) Прибираємо всі пробіли, замінюємо кому на крапку
      let floatString = value.replace(/\s/g, '').replace(',', '.');

      // 2) Пробуємо перетворити в число
      let numberValue = parseFloat(floatString);

      // Якщо не число — скидаємо в порожній рядок
      if (isNaN(numberValue)) {
        onChangeText?.('');
        return;
      }

      // 3) Форматуємо до двох знаків після коми
      let formatted = numberValue.toFixed(2); // тепер це щось типу "1234.56"

      // 4) Розділяємо цілу й дробову частину
      let [integerPart, decimalPart] = formatted.split('.'); // ["1234","56"]

      // 5) Додаємо пробіли між тисячами в цілій частині
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

      // 6) Збираємо назад та повертаємо кому
      formatted = integerPart + ',' + decimalPart; // "1 234,56"

      onChangeText?.(formatted);
    }
  };


  return (
    <View style={[style]}>
      {hasLabel && (
        <Text style={styles.label}>{label}</Text>
      )}

      <TextInput
        style={[
            styles.input, 
            isFocused && styles.focusedInput
        ]}
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocused(true)}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        keyboardType={allowNumbersOnly ? 'numeric' : 'default'}
      />
    </View>
    );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    color: '#026C57',
    borderWidth: 2,
    borderColor: '#026C57',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  focusedInput: {
    borderColor: '#026C57',
    borderWidth: 2,
    backgroundColor: '#FFF',
    boxShadow: '0px 0px 0px 2px rgba(2, 108, 87, 0.20)',
  },
  label: {
    color: '#026C57',
    fontFamily: "SF Pro Rounded",
    fontSize: 17,
    marginBottom: 8
  }
});
