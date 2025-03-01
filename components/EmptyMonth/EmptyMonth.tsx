import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SourceTitle from '@/components/sourceTitle/SourceTitle';
import HintBlock from '@/components/ui/HintBlock';
import CustomInput from '../ui/CustomInput';
import CustomButton from '../ui/CustomButton';
import { Source } from '@/components/types'; 

import styles from './emptyMonth.styles';

interface EmptyMonthProps {
  onSubmit: (sources: Source[]) => void;
  monthKey: string;
  initialSources?: Source[];
}

export default function EmptyMonth({ onSubmit, monthKey, initialSources = [] }: EmptyMonthProps) {
    const [sources, setSources] = useState<Source[]>(initialSources.length > 0 ? initialSources : [
      { id: 1, name: 'Джерело 1', USD: '', EUR: '', UAH: '' }
    ]);

    // 🚀 Завантажуємо дані при відкритті сторінки
    useEffect(() => {
        const loadSavedData = async () => {
            try {
                const savedData = await AsyncStorage.getItem(`balance_${monthKey}`);
                if (savedData) {
                    setSources(JSON.parse(savedData));
                }
            } catch (error) {
                console.error('Error loading saved balance:', error);
            }
        };
        loadSavedData();
    }, [monthKey]);

    const addSource = () => {
        const newSource: Source = {
            id: sources.length + 1,
            name: `Джерело ${sources.length + 1}`,
            USD: '',
            EUR: '',
            UAH: ''
        };
        setSources([...sources, newSource]);
    };

    const updateSourceName = (id: number, newName: string) => {
        setSources(sources.map(source =>
            source.id === id ? { ...source, name: newName } : source
        ));
    };

    const updateSourceValue = (id: number, field: keyof Source, value: string) => {
        setSources(sources.map(source =>
            source.id === id ? { ...source, [field]: value } : source
        ));
    };

    const deleteSource = (id: number) => {
        setSources(sources.filter(source => source.id !== id));
    };

    // 🚀 Функція для збереження даних
    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem(monthKey, JSON.stringify(sources));  // Забираємо зайвий префікс
            onSubmit(sources); 
        } catch (error) {
            console.error('Error saving balance:', error);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView  
                contentContainerStyle={{ paddingBottom: 100 }}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                enableAutomaticScroll
                enableResetScrollToCoords={false}>
                
                <Text style={[styles.title]}>Заповнення Балансу</Text>
                <HintBlock text="Почни зі створення джерела (місце де зберігаються активи) та дай йому зрозумілу для тебе назву." />
                
                {sources.map((source) => (
                    <View key={source.id} >
                        <SourceTitle
                            title={source.name}
                            onChangeTitle={(newName: string) => updateSourceName(source.id, newName)}
                            onDelete={() => deleteSource(source.id)}
                            showDelete={sources.length > 1}
                        />

                        <HintBlock text="Якщо джерело мультивалютне, вкажи дані по кожній валюті окремо, просто переписавши баланс." />

                        <CustomInput
                            style={[styles.input]}
                            label="USD – залишок"
                            placeholder="0,00"
                            allowNumbersOnly
                            value={source.USD}
                            onChangeText={(value) => updateSourceValue(source.id, 'USD', value)}
                        />
                        <CustomInput 
                            style={styles.input}
                            label="EUR – залишок"
                            placeholder="0,00"
                            allowNumbersOnly
                            value={source.EUR}
                            onChangeText={(value) => updateSourceValue(source.id, 'EUR', value)}
                        />
                        <CustomInput 
                            style={styles.input}
                            label="UAH – залишок"
                            placeholder="0,00"
                            allowNumbersOnly
                            value={source.UAH}
                            onChangeText={(value) => updateSourceValue(source.id, 'UAH', value)}
                        />
                    </View>
                ))}
            </KeyboardAwareScrollView>

            <View style={styles.fixedButtonContainer}>
                <CustomButton 
                    title="Додати ще одне джерело" 
                    onPress={addSource} 
                    type="ghost" />
                <CustomButton 
                    title="Зберегти Баланс" 
                    onPress={handleSubmit} />
            </View>
        </View>
    );
}
