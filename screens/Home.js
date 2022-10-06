import {
  Button,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Text from '@kaloraat/react-native-text';

import { useAuth } from '../hooks';
import FooterTabs from '../components/nav/footer/FooterTabs';

const Home = ({ navigation }) => {
  const { auth } = useAuth();

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
