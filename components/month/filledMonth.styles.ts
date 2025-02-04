import { StyleSheet } from 'react-native';
import { typography } from '@/components/style';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    marginTop: 0,
    backgroundColor: '#F4FFFB',
    paddingBottom: 100,
  },
  contentContainer: {
    marginTop: 8,
    padding: 16,
  },
  title: {
    ...typography.bigText,
    color: '#026C57',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 88, // Зменшили висоту, оскільки одна кнопка
    width: '100%',
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(244, 255, 251, 0.80)',
    backdropFilter: 'blur(2px)',
  },
});

export default styles;