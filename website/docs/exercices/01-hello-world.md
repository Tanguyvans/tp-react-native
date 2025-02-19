---
sidebar_position: 3
title: "Exercise 1: Hello World"
---

# Hello World

In this first exercise, you'll build an app that introduces core concepts through a simple counter app. We'll start by creating a structured layout with a header and main content area. Then, we'll add styled text components and implement interactive buttons with visual feedback. Throughout the exercise, we'll apply professional styling to create a polished user interface.

Here's what your final app will look like:

<div align="center">
  <img
    src={require('/img/01-app.png').default}
    alt="Hello World App"
    width={300}
    style={{ margin: '20px 0' }}
  />
</div>

## Step 1: run the project

First, navigate to the exercise directory and install the dependencies:

```bash
cd exercises/01-hello-world
npm install
```

Then, run the project:

```bash
npx expo start
```

You'll see several options to run your app:

- Press `w` to run in web browser
- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator
- Scan QR code with Expo Go app on your phone

If you have connection issues, try running with tunnel:

```bash
npx expo start --tunnel
```

## Step 2: Create Hello-World page

Your project is running, but it is empty. Let's add a simple page with a text component. Go to the `app/index.tsx` file and add the following code:

```tsx
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}
```

## Step 3: Add a counter

Let's add interactivity to our app with a counter. We'll use React's `useState` hook to manage the counter state. The `useState` hook lets us track values that can change over time.

First, import the useState hook and add it to your component:

```tsx
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";
import { useState } from "react";
```

Wrap your main content with `SafeAreaView`:

```tsx
export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView>
      <View>
        <Text>Hello World</Text>
      </View>
    </SafeAreaView>
  );
}
```

<div style={{ 
  padding: '20px', 
  background: 'var(--ifm-background-surface-color)', 
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '8px',
  marginTop: '24px',
  marginBottom: '24px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
}}>

### 📱 Why SafeAreaView?

`SafeAreaView` automatically adds padding to prevent content from being hidden by:

- iPhone notches
- Rounded corners

</div>

Now that we have a count variable, we can use it in the `Text` component.

```tsx
<Text>{count}</Text>
```

Next, let's create buttons to control the counter. We'll use `Pressable` instead of the basic `Button` component because it offers better styling options and press feedback:

```tsx
<View>
  <Pressable onPress={() => setCount(count + 1)}>
    <Text>Increment</Text>
  </Pressable>
  <Pressable onPress={() => setCount(count - 1)}>
    <Text>Decrement</Text>
  </Pressable>
</View>
```

```tsx
<View>
  <Button title="Increment" onPress={() => setCount(count + 1)} />
  <Button title="Increment" onPress={() => setCount(count - 1)} />
</View>
```

The `pressed` state in our style allows us to show visual feedback when the user touches the button. We also prevent the counter from going below zero using `Math.max(0, prev - 1)`.

<div style={{ 
  padding: '20px', 
  background: 'var(--ifm-background-surface-color)', 
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '8px',
  marginTop: '24px',
  marginBottom: '24px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
}}>

### 🎯 Task: Add a Reset Button

Create a new button that:

- Resets the counter to 0 when pressed
- Uses the `Pressable` component

</div>

## Step 4: Style the App

Let's make our app look beautiful by adding styles step by step:

At this point, your code should look like this:

```tsx
export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView>
      <View>
        <Text>Hello World</Text>
      </View>
      <View>
        <Text>{count}</Text>
        <View>
          <Pressable onPress={() => setCount((prev) => Math.max(prev - 1, 0))}>
            <Text>-</Text>
          </Pressable>
          <Pressable onPress={() => setCount((prev) => prev + 1)}>
            <Text>+</Text>
          </Pressable>
          ...
        </View>
      </View>
    </SafeAreaView>
  );
}
```

To add we simply need to create a const styles object and add the styles to the components.

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  counterNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3B30",
  },
  incrementButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  resetButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#666",
    fontSize: 14,
  },
});
```

In React Native, you can combine multiple styles using an array. This is useful when you want to:

- Apply base styles and variations
- Add conditional styles
- Override specific properties

Here's how to combine styles:

```tsx
// Basic style application
<View style={styles.button}>
  <Text>Basic Button</Text>
</View>

// Combining two styles
<View style={[styles.button, styles.incrementButton]}>
  <Text>Combined Styles</Text>
</View>
```

In our counter app, we use this to create different button variations:

```tsx
// Decrement button (red)
<Pressable style={styles.button}>
  <Text>-</Text>
</Pressable>

// Increment button (blue)
<Pressable style={[styles.button, styles.incrementButton]}>
  <Text>+</Text>
</Pressable>
```

The second style in the array will override any duplicate properties from the first style.

<div style={{ 
  padding: '20px', 
  background: 'var(--ifm-background-surface-color)', 
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: '8px',
  marginTop: '24px',
  marginBottom: '24px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
}}>

### 🎯 Try it yourself!

1. Add the styles to the correct components
2. Create a new button variation with a different color
3. Try combining three or more styles
4. Create a selected state for buttons

</div>
