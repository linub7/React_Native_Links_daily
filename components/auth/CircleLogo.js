import { Image, StyleSheet, View } from 'react-native';

const CircleLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
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
    height: 200,
    marginVertical: 20,
  },
});
export default CircleLogo;
