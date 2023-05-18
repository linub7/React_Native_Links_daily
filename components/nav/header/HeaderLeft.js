import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderLeft = () => {
  const navigation = useNavigation();
  const handleNavigateToTrending = () => navigation.navigate('Trending');
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleNavigateToTrending}>
        <Ionicons
          name="trending-up-outline"
          size={35}
          color="#ff9900"
          style={styles.icon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: -6,
    left: 0,
  },
});

export default HeaderLeft;
