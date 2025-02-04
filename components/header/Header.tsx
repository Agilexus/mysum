import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Header.styles';

interface HeaderProps {
  month: string;
}

export default function Header({ month }: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Ліва стрілка */}
      <TouchableOpacity>
        <Image source={require('../../assets/icon/left.png')} style={styles.icon} />
      </TouchableOpacity>

      {/* Назва місяця */}
      <Text style={styles.month}>{month}</Text>

      {/* Права стрілка */}
      <TouchableOpacity>
        <Image source={require('../../assets/icon/right.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}