import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import { useAuth } from '../hooks';
import HeaderTabs from '../components/nav/header/HeaderTabs';

const Stack = createNativeStackNavigator();

const ScreensNav = () => {
  const { auth } = useAuth();

  const isAuthenticated = auth?.token !== '' && auth?.user !== null;

  return (
    <Stack.Navigator initialRouteName="Home">
      {isAuthenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Links Daily',
            headerTitleAlign: 'center',
            headerRight: () => <HeaderTabs />,
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreensNav;
