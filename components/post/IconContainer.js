import Text from '@kaloraat/react-native-text';
import { Ionicons } from '@expo/vector-icons';

const IconContainer = ({ icon, text }) => {
  return (
    <>
      <Ionicons name={icon} size={25} color="#ff9900" />
      <Text center color="#ff9900">
        {text}
      </Text>
    </>
  );
};

export default IconContainer;
