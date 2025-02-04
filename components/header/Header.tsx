import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Header.styles';

interface HeaderProps {
  month: string;
  onNextMonth: () => void;   // Функція для переходу на наступний місяць
  onPreviousMonth: () => void;  // Функція для переходу на попередній місяць
}

export default function Header({ month, onNextMonth, onPreviousMonth }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Ліва стрілка */}
      <TouchableOpacity onPress={onPreviousMonth}>
        <Image source={require('../../assets/icon/left.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Назва місяця */}
      <Text style={styles.month}>{month}</Text>

      {/* Права стрілка */}
      <TouchableOpacity onPress={onNextMonth}>
        <Image source={require('../../assets/icon/right.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
