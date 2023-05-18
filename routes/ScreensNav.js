import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import { useAuth } from '../hooks';
import HeaderTabs from '../components/nav/header/HeaderTabs';
import Account from '../screens/Account';
import Links from '../screens/Links';
import Post from '../screens/Post';
import ForgotPassword from '../screens/ForgotPassword';
import LinkView from '../screens/LinkView';
import UserProfile from '../screens/UserProfile';
import { toCapitalizeWord } from '../utils/general';
import HeaderLeft from '../components/nav/header/HeaderLeft';
import Trending from '../screens/Trending';

const Stack = createNativeStackNavigator();

const ScreensNav = () => {
  const { auth } = useAuth();

  const isAuthenticated = auth?.token !== '' && auth?.user !== null;

  return (
    <Stack.Navigator initialRouteName="Home">
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Links Daily',
              headerTitleAlign: 'center',
              headerRight: () => <HeaderTabs />,
              headerLeft: () => <HeaderLeft />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              title: 'Account',
              headerTitleAlign: 'center',
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Links"
            component={Links}
            options={{
              title: 'My Links',
              headerTitleAlign: 'center',
              headerTransparent: true,
              headerTitleStyle: {
                fontSize: 20,
              },
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              title: 'Post',
              headerTitleAlign: 'center',
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="LinkView"
            component={LinkView}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={({ route }) => ({
              title: toCapitalizeWord(route?.params?.name),
              headerTitleAlign: 'center',
              headerTransparent: true,
              headerTitleStyle: {
                color: 'white',
                fontSize: 40,
              },
              headerRight: () => <HeaderTabs />,
            })}
          />
          <Stack.Screen
            name="Trending"
            component={Trending}
            options={{
              title: '',
              headerTitleAlign: 'center',
              headerTransparent: true,
              headerRight: () => <HeaderTabs />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreensNav;
