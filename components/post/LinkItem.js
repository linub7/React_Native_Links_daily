import { View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import PreviewCard from './PreviewCard';
import { StyleSheet } from 'react-native';

const LinkItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <PreviewCard
        ogDescription={item?.urlPreview?.ogDescription}
        ogImage={item?.urlPreview?.ogImage}
        ogTitle={item?.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default LinkItem;
