import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth, useLinks } from '../../../hooks';
import { logoutUser } from '../../../api/auth';

const HeaderTabs = () => {
  const { setAuth } = useAuth();
  const { setLinks } = useLinks();

  const signoutHandler = async () => {
    setAuth({
      token: '',
      user: null,
    });
    setLinks([]);
    await AsyncStorage.removeItem('@auth');
    await logoutUser();
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signoutHandler}>
        <Ionicons
          name="log-out-outline"
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
    bottom: -4,
    right: 0,
  },
});

export default HeaderTabs;
