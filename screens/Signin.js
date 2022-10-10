import { useState } from 'react';
import Text from '@kaloraat/react-native-text';
import { StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import { signinUser } from '../api/auth';
import AuthCommonLayout from '../components/auth/common-layout';
import Footer from '../components/auth/Footer';
import { useAuth } from '../hooks';

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: 'linub7@gmail.com',
    password: '123456',
  });

  const { setAuth } = useAuth();
  const toast = useToast();

  const handleChangeInput = (identifier, enteredText) => {
    setValues((currentValues) => {
      return {
        ...currentValues,
        [identifier]: enteredText,
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { email, password } = values;
    if (!email || !password || password.length < 6) {
      toast.show(
        'All Fields are required and password must be at least 6 character',
        { type: 'danger' }
      );

      setLoading(false);
      return;
    }

    const { err, data } = await signinUser({ email, password });
    if (err) {
      console.log(err);
      toast.show(err?.error, { type: 'danger' });
      setLoading(false);
      return;
    }
    const { success, ...rest } = data;
    // save response to async storage
    await AsyncStorage.setItem('@auth', JSON.stringify(rest));
    // save in context
    setAuth({
      token: rest?.token,
      user: rest?.user,
    });
    setLoading(false);
    navigation.navigate('Home');
  };

  const handleNavigate = (path) => navigation.navigate(path);

  return (
    <AuthCommonLayout pageTitle={'Sign In'}>
      <UserInput
        label={'Email'}
        value={values?.email}
        onChangeText={handleChangeInput.bind(this, 'email')}
        autoComplete="email"
        keyboardType={'email-address'}
      />
      <UserInput
        label={'Password'}
        value={values?.password}
        onChangeText={handleChangeInput.bind(this, 'password')}
        secureTextEntry={true}
        autoComplete="password"
      />
      <SubmitButton
        label={'Sign In'}
        onPress={handleSubmit}
        loading={loading}
      />
      <Footer
        text={"Don't have an account?"}
        link={'Sign up'}
        onPress={() => handleNavigate('Signup')}
      />
      <Text
        style={styles.forgotPassword}
        small
        center
        color="orange"
        onPress={() => handleNavigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
    </AuthCommonLayout>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 10,
  },
});

export default Signin;
