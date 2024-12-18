const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from './utils/navigationUtils';
import { customTheme } from './theme';


import LoginFrame from "./screens/LoginFrame";
import NewAppointment from "./screens/NewAppointment";
import Notification1 from "./screens/Notification1";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./screens/SignInScreen";
import MainScreen from "./screens/MainScreen";
import OtpVerification from "./screens/OtpVerification";
import ChangePassword from "./screens/ChangePassword";
import CalendarScreen from "./screens/CalendarScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SelectNurse from "./screens/SelectNurse";
import ViewAppointments from "./screens/ViewAppointments"; // Add this line

export default function App() {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer ref={navigationRef}>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="LoginFrame"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
            name = "SignInScreen"
            component={SignInScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen
              name="LoginFrame"
              component={LoginFrame}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewAppointment"
              component={NewAppointment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notification1"
              component={Notification1}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              //options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OtpVerification"
              component={OtpVerification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectNurse"
              component={SelectNurse}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ViewAppointments"
              component={ViewAppointments}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </PaperProvider>
  );
}
