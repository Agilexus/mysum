import { View, Text, Button } from 'react-native';

export default function FilledMonth() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Balance for this month:</Text>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>1000 UAH</Text>
      <Button title="Edit Balance" onPress={() => {}} />
    </View>
  );
}