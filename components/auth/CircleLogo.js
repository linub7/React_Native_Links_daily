import { Image, StyleSheet, View } from 'react-native';

const CircleLogo = ({ img }) => {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 220,
    marginVertical: 20,
  },
});
export default CircleLogo;
