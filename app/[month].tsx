import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyMonth from '@/components/month/EmptyMonth';
import FilledMonth from '@/components/month/FilledMonth';
import Header from '@/components/header/Header';
import { mainStyles } from '@/components/style';
import { Source } from '@/components/types';
import { formatMonthYear } from '@/utils/dateUtils';  // Імпортуємо функцію для форматування

export default function MonthScreen() {
  const { month } = useLocalSearchParams();  
  const [sources, setSources] = useState<Source[]>([]);
  const [isEditing, setIsEditing] = useState(false);  // Додаємо стан для редагування

  const currentMonth = typeof month === 'string' ? month : "Січень";
  const formattedMonth = formatMonthYear(currentMonth);  // Форматуємо місяць для шапки
  const monthKey = `balance_${currentMonth}`;

  // 🚀 Завантажуємо дані з AsyncStorage при кожному відкритті сторінки
  useEffect(() => {
    const loadSources = async () => {
      try {
        console.log('Loading data for key:', monthKey);
        const savedSources = await AsyncStorage.getItem(monthKey);
        if (savedSources) {
          console.log('Data found:', savedSources);
          setSources(JSON.parse(savedSources));
        } else {
          console.log('No data found for this key');
        }
      } catch (error) {
        console.error('Error loading sources:', error);
      }
    };
  
    loadSources();
  }, [monthKey]);

  const handleAddSources = (newSources: Source[]) => {
    setSources(newSources);
    setIsEditing(false);  // Повертаємось до перегляду після збереження
  };

  useEffect(() => {
    const checkAllKeys = async () => {
      const keys = await AsyncStorage.getAllKeys();
      console.log('All AsyncStorage keys after save:', keys);
    };

    checkAllKeys();
  }, [sources]);

  return (
    <View style={mainStyles.body}>
      <Header month={formattedMonth} />  {/* Відображаємо форматовану назву місяця */}
      {isEditing ? (
        <EmptyMonth 
          onSubmit={handleAddSources} 
          monthKey={monthKey} 
          initialSources={sources}  // Передаємо дані для редагування
        />
      ) : (
        <FilledMonth 
          sources={sources} 
          currentMonth={currentMonth} 
          onEdit={() => setIsEditing(true)} 
        />
      )}
    </View>
  );
}
