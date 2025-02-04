import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import { typography } from '../style';

interface HintBlockProps {
  text: string;
}

export default function HintBlock({ text }: HintBlockProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={[styles.text, typography.regular]}>{text}</Text>
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
    opacity: 0.7,
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