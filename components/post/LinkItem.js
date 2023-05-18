import { TouchableOpacity, View } from 'react-native';
import PreviewCard from './PreviewCard';
import { StyleSheet } from 'react-native';

const LinkItem = ({ item, onPress = () => {}, handleManageLike }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <PreviewCard
          ogDescription={item?.urlPreview?.ogDescription}
          ogImage={item?.urlPreview?.ogImage}
          ogTitle={item?.title}
          views={item?.views}
          likes={item?.likes}
          showIcons={true}
          id={item?._id}
          postedBy={item?.postedBy}
          createdAt={item?.createdAt}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 400,
    height: 300,
  },
});

export default LinkItem;
