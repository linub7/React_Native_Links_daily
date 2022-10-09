import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

import FooterTabs from '../components/nav/footer/FooterTabs';
import { useAuth } from '../hooks';
import CircleLogo from '../components/auth/CircleLogo';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import { updateProfilePhoto } from '../api/user';
import { logoutUser, updateUserPassword } from '../api/auth';

const Account = () => {
  const { auth, setAuth } = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const [image, setImage] = useState({ uri: '', public_id: '' });

  const toast = useToast();

  const handleChangePassword = (enteredPassword) =>
    setPassword(enteredPassword);

  const handleSubmit = async () => {
    if (!password || password.length < 6) {
      toast.show(
        'Password is Required & You have to entered at least 6 character',
        { type: 'warning' }
      );
      return;
    }
    setLoading(true);
    const { err, data } = await updateUserPassword(password, auth?.token);
    if (err) {
      console.log(err);
      toast.show(err, { type: 'danger' });
      setLoading(false);
      return;
    }
    console.log(data);
    setLoading(false);
    setPassword('');
    toast.show('Password updated successfully ✅', { type: 'success' });
  };

  const handleLogout = async () => {
    setAuth({
      token: '',
      user: null,
    });
    await AsyncStorage.removeItem('@auth');
    await logoutUser();
  };

  const handleUploadImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log({ permissionResult });

    if (permissionResult.granted === false) {
      alert('Camera access is required');
      return;
    }
    // get image from library
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) return;
    // save to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadedImage(base64Image);

    // send to backend for upload to cloudinary
    const { data, err } = await updateProfilePhoto(base64Image, auth?.token);

    if (err) {
      console.log(err);
      toast.show('OOPS, an error occurred 😓');
      return;
    }

    // update async storage
    const loadedDataFromAsyncStorage = await AsyncStorage.getItem('@auth');
    const parsedData = JSON.parse(loadedDataFromAsyncStorage);
    parsedData.user = data;
    const stringifyData = JSON.stringify(parsedData);
    await AsyncStorage.setItem('@auth', stringifyData);

    // update context
    setAuth({
      ...auth,
      user: {
        name: data?.name,
        email: data?.email,
        role: data?.role,
        image: data?.image,
      },
    });

    setImage({
      uri: data?.image?.secure_url,
      public_id: data?.image?.public_id,
    });
    toast.show('Profile updated successfully ✅', { type: 'success' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {auth?.user?.image?.url ? (
          <CircleLogo
            img={{ uri: auth?.user?.image?.url }}
            onPress={handleUploadImage}
          />
        ) : uploadedImage ? (
          <CircleLogo
            img={{ uri: uploadedImage }}
            onPress={handleUploadImage}
          />
        ) : (
          <CircleLogo
            img={require('../assets/cam.jpg')}
            onPress={handleUploadImage}
          />
        )}

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
