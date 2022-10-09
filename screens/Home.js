import {
  Button,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Text from '@kaloraat/react-native-text';

import FooterTabs from '../components/nav/footer/FooterTabs';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text title center light>
          Home
        </Text>
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

export default Home;
