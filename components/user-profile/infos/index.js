import { Image, StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import moment from 'moment';

const UserProfileScreenInfos = ({ userProfile }) => {
  return (
    <View style={styles.profileInfoContainer}>
      <Image
        source={{
          uri: userProfile?.image?.url
            ? userProfile?.image?.url
            : `http://via.placeholder.com/100x100.png?text=${userProfile?.name
                ?.charAt(0)
                ?.toUpperCase()}`,
        }}
        style={styles.profileImage}
      />
      <Text large color="#e67e22" style={styles.text}>
        {userProfile?.email}
      </Text>
      <Text color="#e67e22" style={styles.text}>
        {userProfile?.role}
      </Text>
      <Text tiny color="#e67e22" style={styles.text}>
        Joined: {moment(userProfile?.createdAt).fromNow()}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  profileInfoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  text: {
    paddingTop: 10,
  },
});

export default UserProfileScreenInfos;
