import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './EmptyMonth.styles';
import SourceTitle from '@/components/SourceTitle/SourceTitle';
import HintBlock from '@/components/ui/HintBlock';
import CustomInput from '../ui/CustomInput';
import CustomButton from '../ui/CustomButton';

export default function EmptyMonth({ onSubmit }) {
    const [usd, setUsd] = useState('');
    const [eur, setEur] = useState('');
    const [uah, setUah] = useState('');
    const [sources, setSources] = useState([{ id: 1, name: 'Джерело 1' }]);

    const addSource = () => {
        const newSource = { id: sources.length + 1, name: `Джерело ${sources.length + 1}` };
        setSources([...sources, newSource]);
    };

    const updateSourceName = (id, newName) => {
        setSources(
            sources.map((source) =>
            source.id === id ? { ...source, name: newName } : source
            )
        );
    };

    const deleteSource = (id: number) => {
        setSources(sources.filter((source) => source.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Заповнення Балансу</Text>
                <HintBlock text="Почни зі створення джерела (місце де зберігаються активи) та дай йому зрозумілу для тебе назву." />
                {sources.map((source) => (
                    <View key={source.id} style={styles.sourceContainer}>
                        <SourceTitle
                            title={source.name}
                            onChangeTitle={(newName: string) => updateSourceName(source.id, newName)}
                            onDelete={() => deleteSource(source.id)}
                            showDelete={sources.length > 1}
                        />

                        <HintBlock text="Якщо джерело мультивалютне, вкажи дані по кожній валюті окремо, просто переписавши баланс." />

                        <CustomInput
                            style={[styles.mb24, styles.mt24]}
                            label="USD – залишок"
                            placeholder="0,00" 
                            allowNumbersOnly
                            value={usd}
                            onChangeText={setUsd}/>
                        <CustomInput 
                            style={styles.mb24}
                            label="EUR – залишок"
                            placeholder="0,00"
                            allowNumbersOnly
                            value={eur}
                            onChangeText={setEur}/>
                        <CustomInput 
                            style={styles.mb24}
                            label="UAH – залишок"
                            placeholder="0,00"
                            allowNumbersOnly
                            value={uah}
                            onChangeText={setUah}/>
                    </View>
                ))}
            </View>

            <View style={styles.fixedButtonContainer}>
                <CustomButton 
                    title="Додати ще одне джерело" 
                    onPress={addSource} 
                    type="ghost" />
                <CustomButton 
                    title="Зберегти Баланс" 
                    onPress={onSubmit} />
            </View>
        </View>
    );
}