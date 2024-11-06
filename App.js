const Stack = createNativeStackNavigator();
import * as React from "react";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from './utils/navigationUtils';
import { customTheme } from './theme';

import MainFrame from "./screens/MainFrame";
import LoginFrame from "./screens/LoginFrame";
import SelectHostpital from "./screens/SelectHostpital";
import NewAppointment from "./screens/NewAppointment";
import Notification1 from "./screens/Notification1";
import Setting from "./screens/Setting";
import DoctorsDetails from "./screens/DoctorsDetails";
import MyAppoinments from "./screens/MyAppoinments";
import Confirm1 from "./screens/Confirm1";
import Chongoi from "./screens/Chongoi";
import BasicOneTime from "./screens/BasicOneTime";
import CTVDetails from "./screens/CTVDetails";
import AdvanceMonth from "./screens/AdvanceMonth";
import AdvanceOneTime from "./screens/AdvanceOneTime";
import BasicMonth from "./screens/BasicMonth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./screens/SignInScreen";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import MainScreen from "./screens/MainScreen";
import OtpVerification from "./screens/OtpVerification";
import ChangePassword from "./screens/ChangePassword";
import CalendarScreen from "./screens/CalendarScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

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
              name="MainFrame"
              component={MainFrame}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginFrame"
              component={LoginFrame}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectHostpital"
              component={SelectHostpital}
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
              name="Setting"
              component={Setting}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DoctorsDetails"
              component={DoctorsDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CTVDetails"
              component={CTVDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyAppoinments"
              component={MyAppoinments}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Confirm1"
              component={Confirm1}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Chongoi"
              component={Chongoi}
              options={{ headerShown: false }}
              />
              <Stack.Screen
            name="BasicOneTime"
            component={BasicOneTime}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="AdvanceMonth"
            component={AdvanceMonth}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="AdvanceOneTime"
            component={AdvanceOneTime}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="BasicMonth"
            component={BasicMonth}
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
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </PaperProvider>
  );
}
