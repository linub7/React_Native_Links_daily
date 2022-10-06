import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';

const SubmitButton = ({ label, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text bold medium center>
        {loading ? 'Loading...' : label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff9900',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 18,
  },
});

export default SubmitButton;
