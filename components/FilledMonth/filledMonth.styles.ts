import { StyleSheet } from 'react-native';
import { typography } from '@/components/style';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    marginTop: 8,
    backgroundColor: '#F4FFFB',
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  pill: {
    flexDirection: 'row',
    marginHorizontal: 72,
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCF0EB',
    borderRadius: 100,
  },
  currency: {
    ...typography.regular,
    color: '#026C57',
    textAlign: 'center',
  },
  separator: {
    width: 2,
    height: '100%',
    backgroundColor: '#F4FFFB',
    opacity: 0.5,
    marginHorizontal: 16,
  },
  currencyBlock: {
    display: 'flex',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyRate: { 
    ...typography.regular,
    color: '#026C57',
    opacity: 0.7,
    marginRight: 6,
  },
  icon: {
    width: 20,
    height: 20,
  },
  mainBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
  },
  mainCurrency: { 
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
    marginTop: 8,
  },
  otherCurrency: {
    ...typography.midlNumb,
    color: '#026C57',
  },
  currencySign: {
    opacity: 0.7,    
  },
  divider: {
    display: 'flex',
    height: 4,
    width: '100%',
    backgroundColor: '#026C57',
    opacity: 0.2,
    marginVertical: 32,
    borderRadius: 100,
  },
  fixedButtonContainer: {
    position: 'absolute',
    left: 16,
    bottom: 0,
    height: 112,
    paddingTop: 8,
    width: '100%',
    backgroundColor: 'rgba(244, 255, 251, 0.80)',
    backdropFilter: 'blur(2px)',
  },
});

export default styles;