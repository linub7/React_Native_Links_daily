import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserInput from '../components/auth/UserInput';
import { useState } from 'react';
import SubmitButton from '../components/auth/SubmitButton';

const Signup = () => {
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

  const handleSubmit = () => {
    console.log({ values });
  };

  return (
    <View style={styles.container}>
      <Text title center>
        Sign Up
      </Text>

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
      <SubmitButton label={'Sign Up'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Signup;
