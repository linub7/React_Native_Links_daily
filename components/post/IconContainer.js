import Text from '@kaloraat/react-native-text';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const IconContainer = ({ icon, text }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={25} color="#ff9900" />
      <Text bold center color="#ff9900">
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconContainer;
