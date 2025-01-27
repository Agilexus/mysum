import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 8,
    maxHeight: 48,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#026C57',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  icons: {
    position: 'absolute',
    flexDirection: 'row',
    right: 16,
    bottom: 13,
  }

});

export default styles;
