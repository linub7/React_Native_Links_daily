import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import Text from '@kaloraat/react-native-text';

import FooterTabs from '../components/nav/footer/FooterTabs';
import { useEffect } from 'react';
import { getLinks, increaseLinkViewCount } from '../api/link';
import { useAuth, useLinks } from '../hooks';
import LinkItem from '../components/post/LinkItem';

const Home = ({ route, navigation }) => {
  const { auth } = useAuth();
  const { links, setLinks } = useLinks();

  useEffect(() => {
    handleGetLinks();
  }, []);

  const handleGetLinks = async () => {
    const { err, data } = await getLinks(auth?.token);
    if (err) {
      console.log(err);
      return;
    }
    setLinks(data?.links);
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text title center light style={styles.title}>
          Recent Links
        </Text>
        {links?.map((item) => (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default Home;
