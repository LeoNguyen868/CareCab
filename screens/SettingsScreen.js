import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.centerContent}>
      <Title>Settings</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
