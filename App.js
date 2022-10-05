import { StatusBar } from 'expo-status-bar';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
  );
}
