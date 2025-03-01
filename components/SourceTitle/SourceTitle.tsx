import React, { useState, useRef } from 'react';
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

  // Створюємо реф, щоб керувати TextInput
  const inputRef = useRef(null);

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

  // При натисканні на "edit" вмикаємо режим редагування + фокус
  const handleEditPress = () => {
    setIsEditing(true);

    // Невеличка затримка (або можна використати requestAnimationFrame),
    // щоб React встиг переключитися на <CustomInput>, інакше focus() спрацює зарано.
    setTimeout(() => {
      if (inputRef.current) {
        // викаємо наш імперативний метод focus()
        (inputRef.current as any).focus();
      }
    }, 50);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <CustomInput
            ref={inputRef} // <-- прив’язуємо реф
            style={styles.input}
            value={currentTitle}
            placeholder="Дайте назву джерелу доходів..."
            onChangeText={setCurrentTitle}
            // при бажанні одразу виділяти текст:
            selectTextOnFocus
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

          {/* Іконка редагувати */}
          <TouchableOpacity onPress={handleEditPress}>
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
