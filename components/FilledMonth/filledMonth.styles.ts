import { StyleSheet } from 'react-native';
import { typography } from '@/components/style';

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 80,
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4E2DA',
    borderRadius: 100,
  },
  separator: {
    width: 2,
    height: '100%',
    backgroundColor: '#F4FFFB',
    opacity: 0.5,
    marginHorizontal: 16,
  },
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
    marginVertical: 32,
    borderRadius: 100,
  },
  infoMessage: {
    ...typography.regular,
    color: '#026C57',
    textAlign: 'center',
  }
});

export default styles;