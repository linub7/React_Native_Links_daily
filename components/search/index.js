import { StyleSheet, Text, TextInput, View } from 'react-native';

const SearchComponent = ({ value, setValue }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(txt) => setValue(txt)}
        placeholder="Search"
        autoCapitalize="none"
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#d9d9d9',
    backgroundColor: '#e6e6e6',
  },
});
