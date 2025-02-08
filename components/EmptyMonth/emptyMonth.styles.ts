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
  form: {
    marginTop: 8,
    padding: 16,
  },
  title: {
    ...typography.bigText,
    color: '#026C57',
  },
  sourceContainer: {
    marginBottom: 32,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 176,
    width: '100%',
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(244, 255, 251, 0.80)',
    backdropFilter: 'blur(2px)',
  },
  mb24: {
    marginBottom: 24,
  },
  mt24: {
    marginTop: 24,
  }
});

export default styles;