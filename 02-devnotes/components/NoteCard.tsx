import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Note } from '../types';

type Props = {
  note: Note;
};

export default function NoteCard({ note }: Props) {
  return (
    {/* Detail de la note */}
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    color: '#666',
    marginBottom: 5,
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
});