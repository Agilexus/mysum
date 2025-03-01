import { StyleSheet } from 'react-native';
import { typography } from '@/components/style';

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 62,
    paddingHorizontal: 0,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 16,
  },
  month: {
    ...typography.midlText,
    textAlign: 'center',
    color: '#026C57',
  },
});

export default styles;