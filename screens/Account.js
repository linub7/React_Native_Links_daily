import { SafeAreaView, StyleSheet, View } from 'react-native';
import Text from '@kaloraat/react-native-text';
import FooterTabs from '../components/nav/footer/FooterTabs';

const Account = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Account</Text>
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
    marginTop: 20,
  },
});

export default Account;
