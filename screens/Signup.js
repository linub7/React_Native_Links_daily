import { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import { signupUser } from '../api/auth';
import AuthCommonLayout from '../components/auth/common-layout';
import Footer from '../components/auth/Footer';
import { useAuth } from '../hooks';

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
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
    const { name, email, password } = values;
    if (!name || !email || !password || password.length < 6) {
      toast.show(
        'All Fields are required and password must be at least 6 character',
        { type: 'danger' }
      );

      setLoading(false);
      return;
    }
    const { err, data } = await signupUser({ name, email, password });
    if (err) {
      toast.show(err?.error, { type: 'danger' });
      console.log(err);
      setLoading(false);
      return;
    }
    console.log('Sign up successful', data);
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

  const handleNavigateToSignin = () => navigation.navigate('Signin');

  return (
    <AuthCommonLayout pageTitle={'Sign Up'}>
      <UserInput
        label={'Name'}
        value={values?.name}
        onChangeText={handleChangeInput.bind(this, 'name')}
        autoCapitalize="words"
        autoCorrect={false}
      />
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
        label={'Sign Up'}
        onPress={handleSubmit}
        loading={loading}
      />
      <Footer
        text={'Already Joined?'}
        link={'Sign in'}
        onPress={handleNavigateToSignin}
      />
    </AuthCommonLayout>
  );
};

export default Signup;
