import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps
} from 'react-native';
import { typography } from '../style';

interface CustomInputProps extends TextInputProps {
  label?: string;
  style?: object;
  value?: string;
  onChangeText?: (text: string) => void;
  allowNumbersOnly?: boolean;
}

// Використовуємо forwardRef, щоб можна було викликати focus() ззовні
const CustomInput = forwardRef<TextInput, CustomInputProps>((
  {
    label,
    placeholder,
    style,
    value,
    onChangeText,
    allowNumbersOnly = false,
    ...restProps
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasLabel = Boolean(label);

  // Локальний реф на внутрішній TextInput
  const inputRef = useRef<TextInput>(null);

  // Зовнішній реф (те, що “бачитиме” батьківський компонент)
  useImperativeHandle(ref, () => inputRef.current!);

  const handleChangeText = (text: string) => {
    if (!allowNumbersOnly) {
      onChangeText?.(text);
      return;
    }
    let cleaned = text.replace(/[^0-9,\s]/g, '');
    const firstCommaIndex = cleaned.indexOf(',');
    if (firstCommaIndex !== -1) {
      cleaned =
        cleaned.slice(0, firstCommaIndex + 1) +
        cleaned.slice(firstCommaIndex + 1).replace(/,/g, '');
    }
    onChangeText?.(cleaned);
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (allowNumbersOnly && value) {
      let floatString = value.replace(/\s/g, '').replace(',', '.');
      let numberValue = parseFloat(floatString);

      if (isNaN(numberValue)) {
        onChangeText?.('');
        return;
      }

      let formatted = numberValue.toFixed(2);
      let [integerPart, decimalPart] = formatted.split('.');
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      formatted = integerPart + ',' + decimalPart;
      onChangeText?.(formatted);
    }
  };

  return (
    <View style={[style]}>
      {hasLabel && (
        <Text style={[typography.regular, styles.label]}>{label}</Text>
      )}

      <TextInput
        ref={inputRef} // прив’язуємо внутрішній TextInput до локального рефа
        style={[
          typography.regular,
          styles.input,
          isFocused && styles.focusedInput
        ]}
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocused(true)}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        keyboardType={allowNumbersOnly ? 'numeric' : 'default'}
        selectTextOnFocus
        {...restProps}
      />
    </View>
  );
});

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    lineHeight: 24,
    height: 48,
    color: '#026C57',
    borderWidth: 2,
    borderColor: '#026C57',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  focusedInput: {
    borderColor: '#026C57',
    borderWidth: 2,
    backgroundColor: '#FFF',
    // У React Native "boxShadow" працює інакше, але залишимо приклад
    boxShadow: '0px 0px 0px 2px rgba(2, 108, 87, 0.20)',
  },
  label: {
    color: '#026C57',
    marginBottom: 8,
  },
});
