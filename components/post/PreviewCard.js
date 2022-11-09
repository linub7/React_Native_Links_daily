import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { Image } from 'react-native';
import IconContainer from './IconContainer';
import { useAuth, useLinks } from '../../hooks';
import { manageLikeLink, manageUnLikeLink } from '../../api/link';
import { useToast } from 'react-native-toast-notifications';

const PreviewCard = ({
  ogTitle = 'Untitled',
  ogDescription = 'No Description Found',
  ogImage = { url: 'https://via.placeholder.com/500x500.png?text=Image' },
  views,
  likes,
  showIcons = false,
  id,
}) => {
  const { auth } = useAuth();
  const { links, setLinks } = useLinks();

  const toast = useToast();

  const isLiked =
    likes !== undefined &&
    likes.length > 0 &&
    likes?.find((el) => el.toString() === auth.user._id.toString()) !==
      undefined
      ? true
      : false;

  const handleLike = async (id) => {
    const { err, data } = await manageLikeLink(id, auth?.token);

    if (err) {
      console.log(err);
      toast.show(err, { type: 'danger' });
      return;
    }

    if (data?.like) {
      setLinks(() => {
        const linkIdx = links.findIndex(
          (link) => link._id.toString() === id.toString()
        );
        links[linkIdx]?.likes?.push(auth?.user?._id);
        return [...links];
      });
    }
  };

  const handleUnlike = async (id) => {
    const { err, data } = await manageUnLikeLink(id, auth?.token);

    if (err) {
      console.log(err);
      toast.show(err, { type: 'danger' });
      return;
    }

    if (data?.unlike) {
      setLinks(() => {
        const linkIdx = links?.findIndex(
          (link) => link._id.toString() === id.toString()
        );
        const likeIdx = links[linkIdx]?.likes?.findIndex(
          (el) => el.toString() === auth?.user._id
        );
        links[linkIdx]?.likes?.splice(likeIdx, 1);
        return [...links];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: ogImage?.url }} style={styles.image} />

      {showIcons && (
        <>
          <View style={styles.eyeContainer}>
            <IconContainer icon={'eye'} text={views} />
          </View>

          {isLiked ? (
            <TouchableOpacity
              style={styles.heartContainer}
              onPress={() => handleUnlike(id)}
            >
              <IconContainer icon={'heart'} text={likes?.length} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.heartContainer}
              onPress={() => handleLike(id)}
            >
              <IconContainer icon={'heart-outline'} text={likes?.length} />
            </TouchableOpacity>
          )}
        </>
      )}

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
  eyeContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  heartContainer: {
    position: 'absolute',
    top: 20,
    right: 80,
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
