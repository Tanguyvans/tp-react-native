---
sidebar_position: 3
title: "Exercice 2: DevNotes"
---

# DevNotes

Dans ce deuxième exercice, nous allons créer une app de notes pour développeurs. Vous apprendrez :

## 🎯 Objectifs

Dans cet exercice, vous apprendrez à :

| Compétence       | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| 🧩 Composants    | Créer et utiliser des composants réutilisables               |
| 📱 Navigation    | Gérer la navigation entre différentes pages de l'application |
| 🔄 Communication | Maîtriser le passage de données entre les écrans             |
| 📂 Architecture  | Organiser efficacement la structure de votre code            |

Voici à quoi ressemblera votre app :

<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
  <img
    src={require('/img/02-01-app.png').default}
    alt="DevNotes App - Liste des notes"
    width={300}
  />
  <img
    src={require('/img/02-02-app.png').default}
    alt="DevNotes App - Création d'une note"
    width={300}
  />
</div>

## 📋 Étape 1 : Création du composant

Commençons par créer le composant réutilisable qui affichera chaque note dans la liste.

### 1.1 Structure des types

Créez un fichier `types.ts` à la racine du projet :

```typescript
export type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};
```

### 1.2 Création du composant

Modifiez le composant `components/NoteCard.tsx` pour afficher les notes dans une card:

```typescript
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Note } from "../types";

type Props = {
  note: Note;
};

export default function NoteCard({ note }: Props) {
  return (
    // TODO: Ajouter un lien vers la page de détail de la note
    // Faite l'affichage de la note dans une card: Pressable, View, Text
    <View></View>
  );
}
```

:::tip Conseil
Inspirez-vous du code de l'exercice précédent pour créer le composant `NoteCard`.
:::

### 1.3 FlatList

Pour afficher la liste des notes, nous allons utiliser le composant `FlatList`. Une `FlatList` est un composant qui permet de afficher une liste de données de manière dynamique. Dans app/index.tsx, nous allons ajouter un `FlatList` qui utilisera le composant `NoteCard` pour chaque note.

Vous trouverez un exemple d'utilisation dans la documentation officielle : [FlatList](https://docs.expo.dev/ui-programming/core-components/flatlist/). Inspirez-vous de cet exemple pour afficher la liste des notes.

Ne pas d'importer le composant `NoteCard.tsx` le fichier index.tsx.

```typescript
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  return (
    <View style={styles.container}>
      {/* TODO: La FlatList doit être ici */}
    </View>
  );
}
```

:::tip Conseil
Dans la documentation les notes sont représentées par `Item` et non `NoteCard`.
:::

## 📝 Étape 2 : Page de détail d'une note

Maintenant que nous avons la liste des notes, nous allons créer la page de détail d'une note. Pour cela nous devons créer une page qui affichera les informations d'une note. Cependant, il faut faire cela de façon dynamique, c'est-à-dire que nous devons pouvoir accéder à la page de détail d'une note en utilisant son id.

### 2.1 Configuration du routage

Nous avons créé un dossier `notes` dans `app/`. Dans ce dossier il faut créer un fichier `[id].tsx` à l'intérieur. Pour l'affichage de la note voici un exemple **très basique** :

```typescript
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function NoteDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Note Detail {id}</Text>
    </View>
  );
}
```

### 2.2 Comment aller vers la page de détail d'une note

La page note est créée mais comment aller vers cette page ? Il faut ajouter un lien vers celle-ci pour chaque note de la page d'accueil. Pour cela nous allons utiliser le composant `Link` de `expo-router`.

```typescript
export default function NoteCard({ note }: Props) {
  return (
    <Link href={`/notes/${note.id}`} asChild>
      {/* Code précédent */}
    </Link>
  );
}
```

A ce stade, vous pouvez accéder à la page de détail d'une note en cliquant sur une note de la liste. Cependant, il manque la barre de navigation en haut et le bouton retour automatique. Pour cela nous allons devoir utiliser le Layout.

### 2.3 Pourquoi un Layout ?

Le Layout joue un rôle crucial dans notre application. Voici la différence entre une navigation avec et sans Layout :

### Sans Layout

- ❌ Pas de barre de navigation en haut
- ❌ Pas de bouton retour automatique
- ❌ Pas d'animations de transition
- ❌ Pas de gestion native du "swipe to go back" sur iOS

### Avec Layout

- ✅ Une barre de navigation professionnelle
- ✅ Un bouton retour automatique
- ✅ Des animations de transition fluides
- ✅ Une gestion native des gestes

:::danger Important
Sans Layout, votre application fonctionnera mais ne ressemblera pas à une vraie application mobile native !
:::

## ✨ Étape 3 : Layout

le layout est le composant racine de l'application. Il est important de le créer pour que l'application fonctionne correctement. Il permet de gérer la navigation entre les différentes pages de l'application.

Créez un dossier `layout` dans `app/` avec un fichier `_layout.tsx`.

```typescript
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ title: "DevNotes" }} />
      <Stack.Screen name="notes/[id]" options={{ title: "Note Details" }} />
    </Stack>
  );
}
```

## ✨ Étape 4 : Nouvelle note

### 4.1 Formulaire de création

Dans le app/new/index.tsx, nous allons créer un formulaire pour créer une nouvelle note. Pour cela nous allons utiliser les composants `TextInput`. Le composant `Pressable` sera utilisé pour le bouton de création.

Pour comprendre le fonctionnement d'un TextInput, consultez la documentation officielle : [TextInput](https://docs.expo.dev/ui-programming/core-components/textinput/).

Pour le Pressable, il suffit de faire appel à la fonction `handleCreate` lorsque l'utilisateur appuie sur le bouton.

```typescript
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { addNoteEvent } from "../index";

export default function NewNote() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    if (title && content) {
      // Émettre l'événement avec les données de la nouvelle note
      addNoteEvent.emit("newNote", { title, content });
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        // TODO: Ajouter les éléments du formulaire
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        // TODO: Ajouter les éléments du formulaire
        multiline
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Create Note</Text>
      </Pressable>
    </View>
  );
}
```

### 4.2 Ajout du bouton de création

Dans app/index.tsx, ajoutez un lien vers la page de création de note.

:::tip Conseil
Pour ajouter un lien, il suffit d'utiliser le composant `Link` de `expo-router`. C'est similaire à ce qui a été fait dans NoteCard.tsx.
:::

### 4.3 Configuration du routage

Comme nous avons créé une nouvelle page, il faut la rendre accessible. Pour cela, il faut ajouter la page dans le layout. Inspirez-vous du code du layout pour ajouter la page.
