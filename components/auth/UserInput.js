import Text from '@kaloraat/react-native-text';
import { StyleSheet, TextInput, View } from 'react-native';

const UserInput = ({
  label,
  value,
  onChangeText,
  autoCapitalize = 'none',
  autoCorrect = false,
  autoComplete,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text semi>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 24,
  },
  input: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
});

export default UserInput;
