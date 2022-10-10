import { useState } from 'react';
import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { forgotUserPassword, resetUserPassword } from '../api/auth';
import AuthCommonLayout from '../components/auth/common-layout';
import Footer from '../components/auth/Footer';
import SubmitButton from '../components/auth/SubmitButton';
import UserInput from '../components/auth/UserInput';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isResetTokenReceived, setIsResetTokenReceived] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleChangeEmail = (enteredEmail) => setEmail(enteredEmail);

  const handleSubmit = async () => {
    if (!email) {
      toast.show('Email is required 😒', { type: 'danger' });
      return;
    }
    setLoading(true);
    const { err, data } = await forgotUserPassword(email);
    if (err) {
      console.log(err);
      toast.show(err?.error, { type: 'danger' });
      setLoading(false);
      return;
    }

    if (data?.success) {
      setLoading(false);
      setIsResetTokenReceived(true);
      toast.show(data?.message, { type: 'success' });
    }
  };

  const handleChangeResetToken = (enteredToken) => setResetToken(enteredToken);
  const handleChangeNewPassword = (enteredPassword) =>
    setNewPassword(enteredPassword);

  const handleResetTokenPassword = async () => {
    if (!resetToken || !newPassword || newPassword.length < 6) {
      toast.show(
        'Reset Token & New Password are required! Password length must be at least 6 character.',
        { type: 'danger' }
      );
      return;
    }
    setLoading(true);
    const values = {
      email,
      resetCode: resetToken,
      password: newPassword,
    };
    const { err, data } = await resetUserPassword(values);
    if (err) {
      console.log(err);
      toast.show(err?.error, { type: 'danger' });
      setLoading(false);
      return;
    }
    if (data?.success) {
      setLoading(false);
      toast.show('Your Password reset successfully 👍', { type: 'success' });
      setTimeout(() => {
        navigation.navigate('Signin');
      }, 1500);
    }
  };

  const handleNavigate = () => navigation.navigate('Signin');

  return (
    <AuthCommonLayout pageTitle={'Forgot Password'}>
      {!isResetTokenReceived ? (
        <>
          <UserInput
            label={'Email'}
            value={email}
            onChangeText={handleChangeEmail}
            autoComplete="email"
            keyboardType={'email-address'}
          />
          <SubmitButton
            label={'Request Reset Code'}
            onPress={handleSubmit}
            loading={loading}
          />
        </>
      ) : (
        <>
          <UserInput
            label={'Reset Token'}
            value={resetToken}
            onChangeText={handleChangeResetToken}
          />
          <UserInput
            label={'Password'}
            value={newPassword}
            onChangeText={handleChangeNewPassword}
            secureTextEntry={true}
            autoComplete="password"
          />
          <SubmitButton
            label={'Change Password'}
            onPress={handleResetTokenPassword}
            loading={loading}
          />
        </>
      )}
      <Footer link={'Go to Signin'} onPress={handleNavigate} />
    </AuthCommonLayout>
  );
};

export default ForgotPassword;
