import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FooterTabsItem = ({ tabLabel, icon, activeIcon, isActive = false }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(tabLabel)}>
      <Ionicons
        name={isActive ? activeIcon : icon}
        size={25}
        style={[styles.icon, isActive && styles.activeIcon]}
      />
      <Text style={isActive && styles.activeText}>{tabLabel}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 3,
    alignSelf: 'center',
  },
  activeIcon: {
    color: '#ff9900',
  },
  activeText: {
    color: '#ff9900',
  },
});

export default FooterTabsItem;
