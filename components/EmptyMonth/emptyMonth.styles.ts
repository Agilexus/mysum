import { StyleSheet } from 'react-native';
import { typography } from '@/components/style';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F4FFFB',
    paddingBottom: 100,
  },
  title: {
    marginTop: 16,
    ...typography.bigText,
    color: '#026C57',
  },
  fixedButtonContainer: {
    position: 'absolute',
    left: 16,
    bottom: 0,
    height: 176,
    width: '100%',
    paddingTop: 8,
    backgroundColor: 'rgba(244, 255, 251, 0.80)',
    backdropFilter: 'blur(2px)',
  },
  input: {
    marginBottom: 24,
  },
});

export default styles;