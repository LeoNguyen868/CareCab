import { MD3LightTheme } from 'react-native-paper';

export const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'deepskyblue',
    primaryContainer: 'lightskyblue',
    secondary: 'paleturquoise',
    secondaryContainer: 'lightcyan',
    // You can customize other colors as needed
    surface: 'white',
    background: '#f6f6f6',
    error: '#B00020',
  },
};
