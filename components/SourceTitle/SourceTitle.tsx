import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import CustomInput from '../ui/CustomInput';

import { typography } from '../style';
import styles from './SourceTitle.styles';

export default function SourceTitle({ title, onChangeTitle, onDelete, showDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);

    const handleSave = () => {
        onChangeTitle(currentTitle); // Передаємо зміну в батьківський компонент
        setIsEditing(false); // Повертаємо тайтл у звичайний стан
    };

    const handleCancel = () => {
        setCurrentTitle(title); // Скасовуємо зміни
        setIsEditing(false); // Повертаємо тайтл у звичайний стан
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <View style={styles.editContainer}>

                    <CustomInput
                        style={[styles.input]}
                        value={currentTitle}
                        placeholder="Дайте назву джерелу доходів..." 
                        onChangeText={setCurrentTitle}/>
                    
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={handleCancel}>
                            <Image
                                source={require('../../assets/icon/cancel.png')} 
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={handleSave}>
                            <Image
                                source={require('../../assets/icon/check.png')} 
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.displayContainer}>
                    <Text style={[styles.title, typography.midlText]}>{currentTitle}</Text>
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Image
                            source={require('../../assets/icon/edit.png')} 
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    
                    {showDelete && (
                        <TouchableOpacity onPress={onDelete}>
                            <Image 
                                source={require('../../assets/icon/trash.png')} 
                                style={styles.icon} 
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}
