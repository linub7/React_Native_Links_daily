import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Text from '@kaloraat/react-native-text';

import FooterTabs from '../components/nav/footer/FooterTabs';
import { useEffect } from 'react';
import { getLinks } from '../api/link';
import { useLinks } from '../hooks';
import LinkItem from '../components/post/LinkItem';

const Home = ({ route }) => {
  const { links, setLinks } = useLinks();

  useEffect(() => {
    handleGetLinks();
  }, []);

  const handleGetLinks = async () => {
    const { err, data } = await getLinks();
    if (err) {
      console.log(err);
      return;
    }
    setLinks(data?.links);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text title center light style={styles.title}>
          Recent Links
        </Text>
        {links?.map((item) => (
          <LinkItem key={item._id} item={item} />
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
