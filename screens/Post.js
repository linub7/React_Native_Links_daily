import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import FooterTabs from '../components/nav/footer/FooterTabs';

const Post = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Post</Text>
      </ScrollView>
      <View style={styles.footerContainer}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Post;
