import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyMonth from '@/components/month/EmptyMonth';
import FilledMonth from '@/components/month/FilledMonth';
import Header from '@/components/header/Header';
import { mainStyles } from '@/components/style';
import { Source } from '@/components/types';
import { formatMonthYear, getNextMonth, getPreviousMonth } from '@/utils/dateUtils';

export default function MonthScreen() {
  const { month } = useLocalSearchParams();  
  const [sources, setSources] = useState<Source[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewMonth, setIsNewMonth] = useState(false);  // Відстеження, чи це новий місяць
  const router = useRouter();

  const currentMonth = typeof month === 'string' ? month : "Січень";
  const formattedMonth = formatMonthYear(currentMonth);
  const monthKey = `balance_${currentMonth}`;

  useEffect(() => {
    const loadSources = async () => {
      try {
        console.log('Loading data for key:', monthKey);
        const savedSources = await AsyncStorage.getItem(monthKey);
        if (savedSources) {
          setSources(JSON.parse(savedSources));
          setIsNewMonth(false);  // Якщо є дані, це не новий місяць
        } else {
          const previousMonthKey = `balance_${getPreviousMonth(currentMonth)}`;
          const previousSources = await AsyncStorage.getItem(previousMonthKey);
          if (previousSources) {
            setSources(JSON.parse(previousSources));  // Копіюємо дані з попереднього місяця
          } else {
            setSources([]);  // Якщо даних немає, залишаємо порожнім
          }
          setIsNewMonth(true);  // Відзначаємо як новий місяць
        }
      } catch (error) {
        console.error('Error loading sources:', error);
      }
    };
    loadSources();
  }, [monthKey]);

  const handleAddSources = (newSources: Source[]) => {
    setSources(newSources);
    setIsEditing(false);
    setIsNewMonth(false);  // Після збереження місяць вважається заповненим
  };

  const navigateToMonth = (direction: 'next' | 'previous') => {
    const targetMonth = direction === 'next' ? getNextMonth(currentMonth) : getPreviousMonth(currentMonth);
    router.push(`/${targetMonth}`);
  };

  return (
    <View style={mainStyles.body}>
      <Header 
        month={formattedMonth} 
        onNextMonth={() => navigateToMonth('next')} 
        onPreviousMonth={() => navigateToMonth('previous')} 
      />
      {isEditing || isNewMonth ? (
        <EmptyMonth 
          onSubmit={handleAddSources} 
          monthKey={monthKey} 
          initialSources={sources}  // Використовуємо дані попереднього місяця
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