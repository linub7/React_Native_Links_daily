import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications';

import Signin from './screens/Signin';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider
      placement="top"
      duration={2000}
      animationType="zoom-in"
      animationDuration={250}
      successColor="green"
      dangerColor="red"
      warningColor="orange"
      normalColor="gray"
      offsetTop={60}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
