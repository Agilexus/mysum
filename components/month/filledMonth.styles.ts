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
  mainBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F4FFFB',
  },
  mainCurrency: { 
    marginTop: 24,
    alignItems: 'center',
  },
  uahAmount: {
    ...typography.mainNumb,
    color: '#026C57',
  },
  secondaryCurrency: {
    ...typography.midlNumb,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  otherCurrency: {
    ...typography.midlNumb,
    color: '#026C57',
  },
  currencySign: {
    opacity: 0.7,
    marginRight: 16,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 112,
    width: '100%',
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(244, 255, 251, 0.80)',
    backdropFilter: 'blur(2px)',
  },
  divider: {
    display: 'flex',
    height: 4,
    width: '100%',
    backgroundColor: '#026C57',
    opacity: 0.2,
    marginTop: 32,
    borderRadius: 100,
  },
});

export default styles;