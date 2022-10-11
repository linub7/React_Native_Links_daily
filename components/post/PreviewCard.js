import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { Image } from 'react-native';

const PreviewCard = ({
  ogTitle = 'Untitled',
  ogDescription = 'No Description Found',
  ogImage = { url: 'https://via.placeholder.com/500x500.png?text=Image' },
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: ogImage?.url }} style={styles.image} />

      <TouchableOpacity>
        <View style={styles.textContainer}>
          <Text medium styles={styles.title}>
            {ogTitle}
          </Text>
          <Text semi>{ogDescription}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 280,
    width: '92%',
    borderRadius: 14,
    shadowColor: '#171717',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    height: '70%',
    width: '100%',
  },
  textContainer: {
    padding: 5,
    height: 50,
  },
  title: {
    paddingVertical: 5,
  },
});

export default PreviewCard;
