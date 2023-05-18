import { ScrollView, StyleSheet } from 'react-native';
import Text from '@kaloraat/react-native-text';
import UserProfileScreenLinksItem from './item';

const UserProfileScreenLinks = ({
  userLinks,
  isVisible = true,
  handleDelete,
  handleUpdate,
  isIconVisible,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isVisible && (
        <Text bold medium center color="#e67e22">
          {userLinks?.length > 0
            ? `${userLinks?.length} Link(s)`
            : 'No Links yet'}
        </Text>
      )}
      {userLinks?.map((link, index) => (
        <UserProfileScreenLinksItem
          key={link?._id}
          link={link}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          isIconVisible={isIconVisible}
        />
      ))}
    </ScrollView>
  );
};

export default UserProfileScreenLinks;
