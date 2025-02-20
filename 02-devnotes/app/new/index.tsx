import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { addNoteEvent } from '../index';

export default function NewNote() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (title && content) {
      // Émettre l'événement avec les données de la nouvelle note
      addNoteEvent.emit('newNote', { title, content });
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        // TODO: ajouter valeur et mise à jour
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        // TODO: ajouter valeur et mise à jour
        multiline
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Create Note</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contentInput: {
    height: 100,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});