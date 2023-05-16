import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
} from 'react-native';
import Text from '@kaloraat/react-native-text';
import { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { Divider } from 'react-native-elements';

import { getUserInfoHandler } from '../api/user';
import { useAuth, useLinks } from '../hooks';
import UserProfileScreenLinks from '../components/user-profile/links';
import UserProfileScreenInfos from '../components/user-profile/infos';
import UserProfileScreenLinksItem from '../components/user-profile/links/item';

const UserProfile = ({ route: { params } }) => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [userLinks, setUserLinks] = useState([]);

  const { auth } = useAuth();
  const { links, setLinks } = useLinks();

  const toast = useToast();

  useEffect(() => {
    handleGetUserInfo();

    return () => {};
  }, [params?.user]);

  const handleGetUserInfo = async () => {
    setLoading(true);
    const { err, data } = await getUserInfoHandler(params?.user, auth?.token);
    if (err) {
      console.log(err);
      setLoading(false);
      return toast.show(err?.error, { type: 'danger' });
    }
    setLoading(false);
    setUserProfile(data?.user);
    setUserLinks(data?.links);
  };
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../assets/bg-image.jpg')}
      resizeMode="cover"
      blurRadius={5}
    >
      <Text large light center style={styles.profileBanner}>
        Profile
      </Text>
      <SafeAreaView style={{ flex: 1 }}>
        <UserProfileScreenInfos userProfile={userProfile} />
        <Divider width={1} />
        <View style={{ paddingBottom: 20 }}></View>
        <UserProfileScreenLinks userLinks={userLinks} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    // flex: 1,
    height: '100%',
  },
  profileBanner: {
    paddingTop: 80,
    paddingBottom: 10,
    color: '#fff',
    fontSize: 40,
  },
});

export default UserProfile;
