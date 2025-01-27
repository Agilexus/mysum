import {useState} from 'react';
import {View, Text} from 'react-native';
import EmptyMonth from '@/components/month/EmptyMonth';
import FilledMonth from '@/components/month/FilledMonth';

export default function MonthScreen() {
  const [hasBalance, setHasBalance] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {hasBalance ? (
          <FilledMonth />
        ) : (
          <EmptyMonth onSubmit={() => setHasBalance(true)} />
        )}
    </View>
  );
}