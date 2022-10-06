import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@kaloraat/react-native-text';
import { Ionicons } from '@expo/vector-icons';

const FooterTabsItem = ({ tabLabel, icon, activeIcon, isActive = false }) => {
  return (
    <TouchableOpacity>
      <>
        <Ionicons
          name={isActive ? activeIcon : icon}
          size={25}
          style={[styles.icon, isActive && styles.activeIcon]}
        />
        <Text style={isActive && styles.activeText}>{tabLabel}</Text>
      </>
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
