import { StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';

const UserProfileScreenLinksItem = ({ link }) => {
  return (
    <View style={styles.container}>
      <Text color="#e67e22">{link?.views} Views</Text>
      <Text color="#e67e22">{link?.urlPreview?.ogTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default UserProfileScreenLinksItem;
