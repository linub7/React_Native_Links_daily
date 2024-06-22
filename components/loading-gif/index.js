import { Image, StyleSheet, View } from 'react-native';

const LoadingGif = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
  },
  loading: {
    height: 100,
    width: 100,
  },
});

export default LoadingGif;
