import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import FooterTabs from '../components/nav/footer/FooterTabs';

const Links = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Links</Text>
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
});

export default Links;
