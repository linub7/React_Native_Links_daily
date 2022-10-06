import { Button, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '../hooks';

const Home = ({ navigation }) => {
  const { auth, setAuth } = useAuth();
  const signoutHandler = async () => {
    await AsyncStorage.removeItem('@auth');
    setAuth({
      token: '',
      user: null,
    });
    navigation.navigate('Signin');
  };
  return (
    <View>
      <Text>Home</Text>
      <Text>{JSON.stringify(auth, null, 4)}</Text>
      <Button title="Sign out" onPress={signoutHandler} />
    </View>
  );
};

export default Home;
