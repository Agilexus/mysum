import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function HintBlock({ text }) {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingLeft: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  text: {
    color: '#026C57',
    fontSize: 17,
  },
  line: {
    position: 'absolute',
    top: 8,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: '#026C57',
    borderRadius: 100,
  }
});