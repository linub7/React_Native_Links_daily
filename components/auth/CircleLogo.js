import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const CircleLogo = ({ img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={img} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    marginVertical: 20,
    borderRadius: 200,
  },
});
export default CircleLogo;
