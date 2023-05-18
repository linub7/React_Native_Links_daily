import { StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserProfileScreenLinksItem = ({
  link,
  isIconVisible = false,
  handleDelete = () => {},
  handleUpdate = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text color="#e67e22">{link?.views} Views</Text>
        {isIconVisible && (
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => handleDelete(link?._id)}>
              <Ionicons name={'trash-outline'} size={25} color={'#e67e22'} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => handleUpdate(link?._id)}>
              <Ionicons name={'pencil-outline'} size={25} color={'#e67e22'} />
            </TouchableOpacity> */}
          </View>
        )}
      </View>
      <Text color="#e67e22">{link?.urlPreview?.ogTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserProfileScreenLinksItem;
