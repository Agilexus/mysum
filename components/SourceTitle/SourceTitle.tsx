import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CustomInput from '../ui/CustomInput';
import { typography } from '../style';
import styles from './sourceTitle.styles';

interface SourceTitleProps {
    title: string;
    onChangeTitle: (newTitle: string) => void;
    onDelete: () => void;
    showDelete: boolean;
}

export default function SourceTitle({ title, onChangeTitle, onDelete, showDelete }: SourceTitleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState<string>(title);

    const handleSave = () => {
        if (currentTitle !== title) {
            onChangeTitle(currentTitle);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCurrentTitle(title);
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <View style={styles.editContainer}>
                    <CustomInput
                        style={styles.input}
                        value={currentTitle}
                        placeholder="Дайте назву джерелу доходів..." 
                        onChangeText={setCurrentTitle}
                    />
                    
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={handleCancel}>
                            <Image source={require('../../assets/icon/cancel.png')} style={styles.icon} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={handleSave}>
                            <Image source={require('../../assets/icon/check.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.displayContainer}>
                    <Text style={[styles.title, typography.midlText]}>{currentTitle}</Text>
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Image source={require('../../assets/icon/edit.png')} style={styles.icon} />
                    </TouchableOpacity>
                    
                    {showDelete && (
                        <TouchableOpacity onPress={onDelete}>
                            <Image source={require('../../assets/icon/trash.png')} style={styles.icon} />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}
