import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { InteractionManager, View, ActivityIndicator } from 'react-native';
import { getCurrentMonth } from '@/utils/dateUtils';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      const month = getCurrentMonth();
      router.replace(`/${month}`);
    });

    return () => task.cancel();
  }, [router]);

  // Сторінка виглядає як EmptyMonth із потрібним фоном
  return (
    <View style={{ flex: 1, backgroundColor: '#F4FFFB', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#026C57" />
    </View>
  );
}