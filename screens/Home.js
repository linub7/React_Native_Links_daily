import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { useEffect, useState } from 'react';

import FooterTabs from '../components/nav/footer/FooterTabs';
import { getLinks, getLinksCount, increaseLinkViewCount } from '../api/link';
import { useAuth, useLinks } from '../hooks';
import LinkItem from '../components/post/LinkItem';
import SubmitButton from '../components/auth/SubmitButton';

const Home = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [linksCount, setLinksCount] = useState(0);
  const { auth } = useAuth();
  const { links, setLinks } = useLinks();

  useEffect(() => {
    handleGetLinks();
  }, [pageNumber]);

  const handleGetLinks = async () => {
    setLoading(true);
    const { err, data } = await getLinks(auth?.token, pageNumber);
    if (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    console.log('data from getLinks: ', data?.links);
    data?.links?.forEach((element) => setLinks((prev) => [...prev, element]));
  };

  useEffect(() => {
    handleGetLinksCount();
  }, []);

  const handleGetLinksCount = async () => {
    setLoading(true);
    const { err, data } = await getLinksCount(auth?.token);
    if (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    setLoading(false);
    setLinksCount(data?.count);
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
        {links?.length !== linksCount ? (
          <SubmitButton
            loading={loading}
            label={'Load more'}
            onPress={() => setPageNumber((prev) => prev + 1)}
          />
        ) : null}
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
