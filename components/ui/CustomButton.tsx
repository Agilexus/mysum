import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { typography } from '../style';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: 'filled' | 'ghost';
}

export default function CustomButton({ title, onPress, type = 'filled' }: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, type === 'ghost' && styles.ghostButton]}
      onPress={onPress}
    >
      <Text style={[typography.midlText, styles.text, type === 'ghost' && styles.ghostText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#026C57',
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    width: '100%',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
  },
  ghostText: {
    color: '#026C57',
  },
});
