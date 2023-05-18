import { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Text from '@kaloraat/react-native-text';
import { getTrendingAndLatestLinks, increaseLinkViewCount } from '../api/link';
import { useAuth, useLinks } from '../hooks';
import LinkItem from '../components/post/LinkItem';
import FooterTabs from '../components/nav/footer/FooterTabs';

const Trending = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [trendingLinks, setTrendingLinks] = useState([]);
  const [latestLinks, setLatestLinks] = useState([]);
  const { auth } = useAuth();
  const { setLinks, links } = useLinks();

  console.log({ trendingLinks, latestLinks });

  useEffect(() => {
    handleGetTrendingAndLatestLinks();

    return () => {
      setTrendingLinks([]);
    };
  }, []);

  const handleGetTrendingAndLatestLinks = async () => {
    setLoading(true);
    const { err, data } = await getTrendingAndLatestLinks(auth?.token);
    if (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    setTrendingLinks(data?.trendingLinks);
    setLatestLinks(data?.latestLinks);
  };

  const handleNavigate = async (item) => {
    await increaseLinkViewCount(item._id, auth?.token);

    // update link in the context
    setLinks(() => {
      const linkIdx = links.findIndex(
        (link) => link?._id?.toString() === item?._id?.toString()
      );
      links[linkIdx] = { ...links[linkIdx], views: links[linkIdx].views + 1 };
      return [...links];
    });

    //redirect
    navigation.navigate('LinkView', { item });
  };
  return (
    <ImageBackground
      source={require('../assets/trending.jpg')}
      style={styles.imageBackground}
      resizeMode="cover"
      blurRadius={5}
    >
      <SafeAreaView style={styles.container}>
        <Text title center light style={styles.title}>
          Trending Links
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trendingLinks?.map((item) => (
            <LinkItem
              item={item}
              key={item._id}
              onPress={() => handleNavigate(item)}
            />
          ))}
        </ScrollView>
        <Text title center light style={styles.title1}>
          Latest Links
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {latestLinks?.map((item) => (
            <LinkItem
              item={item}
              key={item._id}
              onPress={() => handleNavigate(item)}
            />
          ))}
        </ScrollView>
        <View>
          <FooterTabs />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
  },
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 40,
    paddingBottom: 10,
    color: '#fff',
  },
  title1: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fff',
  },
});

export default Trending;
