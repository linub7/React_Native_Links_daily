import { useState } from 'react';

import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import { signupUser } from '../api/auth';
import AuthCommonLayout from '../components/auth/common-layout';
import { Text } from 'react-native';
import Footer from '../components/auth/Footer';

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

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
    if (!name || !email || !password) {
      alert('All Fields are required');
      setLoading(false);
      return;
    }
    const { err, data } = await signupUser({ name, email, password });
    if (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    console.log('Sign up successful', data);
    setLoading(false);
    alert('Sign up Successfully');
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
