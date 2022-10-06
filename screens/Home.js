import { Button, StyleSheet, View, SafeAreaView } from 'react-native';
import Text from '@kaloraat/react-native-text';

import { useAuth } from '../hooks';
import FooterTabs from '../components/nav/footer/FooterTabs';

const Home = ({ navigation }) => {
  const { auth, setAuth } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text style={styles.text}>{JSON.stringify(auth, null, 4)}</Text>
      </>
      <FooterTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    // marginTop: 20,
  },
});

export default Home;
