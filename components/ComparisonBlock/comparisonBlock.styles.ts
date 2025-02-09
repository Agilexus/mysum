import { StyleSheet } from 'react-native';
import { typography } from '@/components/style';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 32,

  },
  title: {
    ...typography.midlText,
    marginBottom: 12,
    textAlign: 'center',
  },
  row: { 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    ...typography.smallNumb,
    marginBottom: 12,
    opacity: 0.7,
  },
  positive: {
    color: '#026C57',
  },
  negative: {
    color: '#B11212',
  },
});

export default styles;
