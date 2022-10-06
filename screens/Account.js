import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FooterTabs from '../components/nav/footer/FooterTabs';
import { useAuth } from '../hooks';
import CircleLogo from '../components/auth/CircleLogo';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';

const Account = () => {
  const { auth, setAuth } = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = (enteredPassword) =>
    setPassword(enteredPassword);

  const handleSubmit = () => {};

  const handleLogout = async () => {
    setAuth({
      token: '',
      user: null,
    });
    await AsyncStorage.removeItem('@auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <CircleLogo img={require('../assets/person-1.webp')} />
        <Text center bold>
          {auth?.user?.name.toUpperCase()}
        </Text>
        <Text center medium>
          {auth?.user?.email}
        </Text>
        <Text center small light style={styles.text}>
          {auth?.user?.role}
        </Text>
        <UserInput
          label={'Password'}
          value={password}
          onChangeText={handleChangePassword}
          secureTextEntry={true}
          autoComplete="password"
        />
        <SubmitButton
          label={'Update Password'}
          onPress={handleSubmit}
          loading={loading}
        />
        <SubmitButton
          label={'Logout'}
          onPress={handleLogout}
          loading={loading}
          additionalStyle={{ backgroundColor: 'red' }}
        />
      </ScrollView>
      <View>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginVertical: 100,
  },
  text: {
    marginBottom: 20,
  },
});

export default Account;
