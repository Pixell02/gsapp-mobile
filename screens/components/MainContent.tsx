import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
interface Props {
  children: React.ReactNode;
}

export default function MainContent({ children }: Props): JSX.Element {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
      {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 8,
  },
});
