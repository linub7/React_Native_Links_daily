import { View } from 'react-native';
import Text from '@kaloraat/react-native-text';

const UserProfile = ({ route }) => {
  console.log(route);
  return (
    <View>
      <Text>User Profile</Text>
    </View>
  );
};

export default UserProfile;
