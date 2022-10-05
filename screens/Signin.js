import { useState } from 'react';
import Text from '@kaloraat/react-native-text';

import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import { signinUser } from '../api/auth';
import AuthCommonLayout from '../components/auth/common-layout';
import Footer from '../components/auth/Footer';
import { StyleSheet } from 'react-native';

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
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
    const { email, password } = values;
    if (!email || !password) {
      alert('All Fields are required');
      setLoading(false);
      return;
    }
    const { err, data } = await signinUser({ email, password });
    if (err) {
      console.log(err);
      setLoading(false);
    }
    console.log('Sign in successful', data);
    alert('Sign in Successfully');
  };

  const handleNavigateToSignup = () => navigation.navigate('Signup');

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
        onPress={handleNavigateToSignup}
      />
      <Text
        style={styles.forgotPassword}
        small
        center
        color="orange"
        onPress={() => {}}
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
